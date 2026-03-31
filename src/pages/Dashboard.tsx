import React, { useState, useEffect, useRef } from 'react';
import { Card, Row, Col, Statistic, Select, Spin } from 'antd';
import * as echarts from 'echarts';
import { seatAPI, analyticsAPI } from '../services/api';

const { Option } = Select;

const Dashboard: React.FC = () => {
  const [seats, setSeats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('current');
  const [usageData, setUsageData] = useState<any>(null);
  const heatmapRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<echarts.ECharts | null>(null);

  // 初始化热力图
  const initHeatmap = () => {
    if (!heatmapRef.current) return;
    
    chartRef.current = echarts.init(heatmapRef.current);
    updateHeatmap();
  };

  // 更新热力图
  const updateHeatmap = () => {
    if (!chartRef.current) return;

    // 准备热力图数据
    const heatmapData = seats.map(seat => {
      // 根据座位ID生成坐标
      const row = seat.seat_id.charAt(0).charCodeAt(0) - 'A'.charCodeAt(0);
      const col = parseInt(seat.seat_id.substring(1)) - 1;
      
      // 根据状态设置颜色值
      let value = 0;
      if (seat.status === 'using') value = 1;
      else if (seat.status === 'away') value = 0.5;
      else value = 0;

      return [col, row, value];
    });

    const option = {
      tooltip: {
        position: 'top',
        formatter: (params: any) => {
          const seat = seats[params.dataIndex];
          return `工位: ${seat.seat_id}<br/>状态: ${seat.status === 'using' ? '使用中' : seat.status === 'away' ? '离开' : '空闲'}<br/>${seat.student_name ? `学生: ${seat.student_name}` : ''}`;
        }
      },
      grid: {
        height: '70%',
        top: '10%'
      },
      xAxis: {
        type: 'category',
        data: ['1', '2', '3', '4'],
        splitArea: {
          show: true
        }
      },
      yAxis: {
        type: 'category',
        data: ['A', 'B'],
        splitArea: {
          show: true
        }
      },
      visualMap: {
        min: 0,
        max: 1,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '5%',
        inRange: {
          color: ['#f0f2f5', '#52c41a', '#ff4d4f']
        }
      },
      series: [{
        name: '工位状态',
        type: 'heatmap',
        data: heatmapData,
        label: {
          show: true
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };

    chartRef.current.setOption(option);
  };

  // 加载工位数据
  const loadSeats = async () => {
    setLoading(true);
    try {
      const response = await seatAPI.getSeats();
      if (response.code === 200) {
        setSeats(response.data);
      }
    } catch (error) {
      console.error('加载工位数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 加载使用率数据
  const loadUsageData = async () => {
    try {
      const params = {
        time_range: timeRange === 'current' ? 'day' : timeRange
      };
      const response = await analyticsAPI.getSeatUsage(params);
      if (response.code === 200) {
        setUsageData(response.data);
      }
    } catch (error) {
      console.error('加载使用率数据失败:', error);
    }
  };

  useEffect(() => {
    loadSeats();
    loadUsageData();
  }, [timeRange]);

  useEffect(() => {
    initHeatmap();
    
    // 定时更新数据
    const interval = setInterval(() => {
      loadSeats();
      loadUsageData();
    }, 5000);

    // 窗口大小变化时重新调整图表
    const handleResize = () => {
      chartRef.current?.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
      chartRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    updateHeatmap();
  }, [seats]);

  return (
    <div style={{ padding: 20, background: '#f0f2f5', minHeight: '100vh' }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="实验室工位使用情况" style={{ marginBottom: 16 }}>
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <Statistic
                  title="总工位"
                  value={usageData?.total_seats || 0}
                  suffix="个"
                  style={{ backgroundColor: '#fff', padding: 16, borderRadius: 8 }}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="使用中"
                  value={usageData?.used_seats || 0}
                  suffix="个"
                  style={{ backgroundColor: '#fff', padding: 16, borderRadius: 8 }}
                  valueStyle={{ color: '#52c41a' }}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="使用率"
                  value={usageData?.usage_rate || 0}
                  suffix="%"
                  style={{ backgroundColor: '#fff', padding: 16, borderRadius: 8 }}
                  valueStyle={{ color: '#1890ff' }}
                />
              </Col>
              <Col span={6}>
                <Select
                  defaultValue="current"
                  style={{ width: '100%', marginTop: 8 }}
                  onChange={setTimeRange}
                >
                  <Option value="current">当前</Option>
                  <Option value="day">今日</Option>
                  <Option value="week">本周</Option>
                </Select>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card title="工位热力图" style={{ height: 600 }}>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 500 }}>
                <Spin size="large" />
              </div>
            ) : (
              <div ref={heatmapRef} style={{ width: '100%', height: 500 }} />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;