import React, { useState, useEffect, useRef } from 'react';
import { Card, Row, Col, Select, Spin, Statistic, Table, Tag, Button, DatePicker, message } from 'antd';
import * as echarts from 'echarts';
import { DownloadOutlined } from '@ant-design/icons';
import { analyticsAPI } from '../services/api';

const { Option } = Select;
const { RangePicker } = DatePicker;

const Analytics: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [exportLoading, setExportLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('day');
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);
  const [usageData, setUsageData] = useState<any>(null);
  const [attendanceData, setAttendanceData] = useState<any>(null);
  const [anomalyData, setAnomalyData] = useState<any>(null);
  const usageChartRef = useRef<HTMLDivElement>(null);
  const attendanceChartRef = useRef<HTMLDivElement>(null);
  const heatmapChartRef = useRef<HTMLDivElement>(null);
  const classDistributionChartRef = useRef<HTMLDivElement>(null);
  const usageChart = useRef<echarts.ECharts | null>(null);
  const attendanceChart = useRef<echarts.ECharts | null>(null);
  const heatmapChart = useRef<echarts.ECharts | null>(null);
  const classDistributionChart = useRef<echarts.ECharts | null>(null);

  // 模拟教师ID（实际应该从认证信息中获取）
  const teacherId = '1';

  // 加载使用率数据
  const loadUsageData = async () => {
    setLoading(true);
    try {
      const response: any = await analyticsAPI.getSeatUsage({ time_range: timeRange });
      if (response.code === 200) {
        setUsageData(response.data);
      }
    } catch (error) {
      console.error('加载使用率数据失败:', error);
    }
  };

  // 加载出勤统计数据
  const loadAttendanceData = async () => {
    try {
      const response: any = await analyticsAPI.getStudentAttendance({ time_range: timeRange }, teacherId);
      if (response.code === 200) {
        setAttendanceData(response.data);
      }
    } catch (error) {
      console.error('加载出勤统计数据失败:', error);
    }
  };

  // 加载异常数据
  const loadAnomalyData = async () => {
    try {
      const response: any = await analyticsAPI.getAnomalies(teacherId);
      if (response.code === 200) {
        setAnomalyData(response.data);
      }
    } catch (error) {
      console.error('加载异常数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 导出出勤数据
  const handleExportData = async () => {
    setExportLoading(true);
    try {
      const response: Blob = await analyticsAPI.exportAttendanceData({ start_date: dateRange?.[0], end_date: dateRange?.[1] }, teacherId) as Blob;
      
      // 创建下载链接
      const url = window.URL.createObjectURL(response);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `attendance_data_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      message.success('数据导出成功！');
    } catch (error) {
      console.error('导出数据失败:', error);
      message.error('数据导出失败，请重试');
    } finally {
      setExportLoading(false);
    }
  };

  // 更新使用率图表
  const updateUsageChart = () => {
    if (!usageChartRef.current || !usageData) return;
    
    if (!usageChart.current) {
      usageChart.current = echarts.init(usageChartRef.current);
    }

    const option = {
      backgroundColor: 'transparent',
      title: {
        text: '工位使用率趋势',
        left: 'center',
        textStyle: {
          color: '#333',
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: '#e6f7ff',
        textStyle: {
          color: '#333'
        }
      },
      xAxis: {
        type: 'category',
        data: usageData.data.map((item: any) => item.time),
        axisLine: {
          lineStyle: {
            color: '#e8e8e8'
          }
        },
        axisLabel: {
          color: '#666'
        }
      },
      yAxis: {
        type: 'value',
        name: '使用率(%)',
        axisLine: {
          lineStyle: {
            color: '#e8e8e8'
          }
        },
        axisLabel: {
          color: '#666'
        },
        splitLine: {
          lineStyle: {
            color: '#f0f0f0'
          }
        }
      },
      series: [{
        data: usageData.data.map((item: any) => item.usage_rate),
        type: 'line',
        smooth: true,
        lineStyle: {
          color: '#722ed1',
          width: 3
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(114, 46, 209, 0.3)' },
            { offset: 1, color: 'rgba(114, 46, 209, 0.1)' }
          ])
        },
        itemStyle: {
          color: '#722ed1'
        }
      }]
    };

    usageChart.current.setOption(option);
  };

  // 更新出勤统计图表
  const updateAttendanceChart = () => {
    if (!attendanceChartRef.current || !attendanceData) return;
    
    if (!attendanceChart.current) {
      attendanceChart.current = echarts.init(attendanceChartRef.current);
    }

    const option = {
      backgroundColor: 'transparent',
      title: {
        text: '学生出勤情况',
        left: 'center',
        textStyle: {
          color: '#333',
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: '#e6f7ff',
        textStyle: {
          color: '#333'
        }
      },
      xAxis: {
        type: 'category',
        data: attendanceData.data.slice(0, 10).map((item: any) => item.name),
        axisLine: {
          lineStyle: {
            color: '#e8e8e8'
          }
        },
        axisLabel: {
          color: '#666',
          rotate: 45
        }
      },
      yAxis: {
        type: 'value',
        name: '出勤率(%)',
        axisLine: {
          lineStyle: {
            color: '#e8e8e8'
          }
        },
        axisLabel: {
          color: '#666'
        },
        splitLine: {
          lineStyle: {
            color: '#f0f0f0'
          }
        }
      },
      series: [{
        data: attendanceData.data.slice(0, 10).map((item: any) => item.attendance_rate),
        type: 'bar',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#1890ff' },
            { offset: 1, color: '#69c0ff' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#69c0ff' },
              { offset: 1, color: '#1890ff' }
            ])
          }
        }
      }]
    };

    attendanceChart.current.setOption(option);
  };

  // 生成实时工位使用数据
  const generateRealTimeSeatData = () => {
    // 模拟工位数据，A区1-20号，B区1-20号，共40个工位
    const seats = [];
    const areas = ['A', 'B'];
    
    for (let area of areas) {
      for (let i = 1; i <= 20; i++) {
        const seatId = area + i;
        // 随机生成使用状态，70%的概率有人使用
        const isUsed = Math.random() > 0.3;
        const studentName = isUsed ? `学生${Math.floor(Math.random() * 1000) + 1}` : null;
        
        seats.push({
          id: seatId,
          area: area,
          number: i,
          isUsed: isUsed,
          studentName: studentName
        });
      }
    }
    
    return seats;
  };

  // 更新热力图
  const updateHeatmapChart = () => {
    if (!heatmapChartRef.current) return;
    
    if (!heatmapChart.current) {
      heatmapChart.current = echarts.init(heatmapChartRef.current);
    }

    // 生成实时工位使用数据
    const seatData = generateRealTimeSeatData();
    
    // 转换为热力图数据格式
    const heatmapData: number[][] = [];
    seatData.forEach((seat, index) => {
      const row = Math.floor(index / 20); // A区为0行，B区为1行
      const col = index % 20; // 列号0-19
      const value = seat.isUsed ? 100 : 0; // 有人为100，无人为0
      
      heatmapData.push([col, row, value]);
    });

    const option = {
      backgroundColor: 'transparent',
      title: {
        text: '实时工位使用情况',
        left: 'center',
        textStyle: {
          color: '#333',
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      tooltip: {
        position: 'top',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: '#e6f7ff',
        textStyle: {
          color: '#333'
        },
        formatter: (params: any) => {
          const seatIndex = params.data[1] * 20 + params.data[0];
          const seat = seatData[seatIndex];
          if (seat) {
            return `工位: ${seat.id}<br/>状态: ${seat.isUsed ? '有人' : '无人'}${seat.studentName ? `<br/>学生: ${seat.studentName}` : ''}`;
          }
          return '';
        }
      },
      grid: {
        height: '60%',
        top: '15%',
        left: '10%',
        right: '10%'
      },
      xAxis: {
        type: 'category',
        data: Array.from({ length: 20 }, (_, i) => (i + 1).toString()),
        axisLine: {
          lineStyle: {
            color: '#e8e8e8'
          }
        },
        axisLabel: {
          color: '#666'
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ['rgba(240, 240, 240, 0.3)', 'rgba(255, 255, 255, 0.3)']
          }
        }
      },
      yAxis: {
        type: 'category',
        data: ['A区', 'B区'],
        axisLine: {
          lineStyle: {
            color: '#e8e8e8'
          }
        },
        axisLabel: {
          color: '#666'
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: ['rgba(240, 240, 240, 0.3)', 'rgba(255, 255, 255, 0.3)']
          }
        }
      },
      visualMap: {
        min: 0,
        max: 100,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '10%',
        textStyle: {
          color: '#666'
        },
        inRange: {
          color: ['#f0f9ff', '#ff4d4f']
        },
        pieces: [
          {
            min: 1,
            max: 100,
            label: '有人',
            color: '#ff4d4f'
          },
          {
            min: 0,
            max: 0,
            label: '无人',
            color: '#f0f9ff'
          }
        ]
      },
      series: [{
        name: '工位状态',
        type: 'heatmap',
        data: heatmapData,
        label: {
          show: true,
          formatter: (params: any) => {
            const seatIndex = params.data[1] * 20 + params.data[0];
            const seat = seatData[seatIndex];
            return seat?.id || '';
          },
          color: '#333'
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.2)'
          }
        }
      }]
    };

    heatmapChart.current.setOption(option);
  };

  // 更新班级分布图表
  const updateClassDistributionChart = () => {
    if (!classDistributionChartRef.current) return;
    
    if (!classDistributionChart.current) {
      classDistributionChart.current = echarts.init(classDistributionChartRef.current);
    }

    // 模拟班级分布数据
    const classData = [
      { name: '计算机1班', value: 200, attendance: 88.5 },
      { name: '计算机2班', value: 200, attendance: 86.2 },
      { name: '计算机3班', value: 200, attendance: 90.1 },
      { name: '计算机4班', value: 200, attendance: 84.7 },
      { name: '计算机5班', value: 200, attendance: 87.9 }
    ];

    const option = {
      backgroundColor: 'transparent',
      title: {
        text: '班级出勤分布',
        left: 'center',
        textStyle: {
          color: '#333',
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: '#e6f7ff',
        textStyle: {
          color: '#333'
        },
        formatter: '{b}: {c}人\n出勤率: {d}%'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        textStyle: {
          color: '#666'
        }
      },
      series: [{
        name: '班级人数',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold',
            color: '#333'
          }
        },
        labelLine: {
          show: false
        },
        data: classData.map((item, index) => {
          const colors = ['#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1'];
          return {
            name: item.name,
            value: item.value,
            itemStyle: {
              color: colors[index % colors.length]
            }
          };
        })
      }]
    };

    classDistributionChart.current.setOption(option);
  };

  // 初始化和更新图表
  const initCharts = () => {
    updateUsageChart();
    updateAttendanceChart();
    updateHeatmapChart();
    updateClassDistributionChart();
  };

  useEffect(() => {
    loadUsageData();
    loadAttendanceData();
    loadAnomalyData();
  }, [timeRange]);

  useEffect(() => {
    if (!loading) {
      // 数据加载完成后初始化图表
      setTimeout(() => {
        initCharts();
      }, 100);
    }
  }, [loading, usageData, attendanceData]);

  useEffect(() => {
    // 窗口大小变化时重新调整图表
    const handleResize = () => {
      usageChart.current?.resize();
      attendanceChart.current?.resize();
      heatmapChart.current?.resize();
      classDistributionChart.current?.resize();
    };
    window.addEventListener('resize', handleResize);

    // 定期更新热力图数据，实现实时效果
    const heatmapUpdateInterval = setInterval(() => {
      updateHeatmapChart();
    }, 5000); // 每5秒更新一次

    return () => {
      window.removeEventListener('resize', handleResize);
      // 清除定时器
      clearInterval(heatmapUpdateInterval);
      // 清理图表实例
      if (usageChart.current) {
        usageChart.current.dispose();
        usageChart.current = null;
      }
      if (attendanceChart.current) {
        attendanceChart.current.dispose();
        attendanceChart.current = null;
      }
      if (heatmapChart.current) {
        heatmapChart.current.dispose();
        heatmapChart.current = null;
      }
      if (classDistributionChart.current) {
        classDistributionChart.current.dispose();
        classDistributionChart.current = null;
      }
    };
  }, []);

  // 异常数据表格列定义
  const anomalyColumns = [
    {
      title: '学生ID',
      dataIndex: 'student_id',
      key: 'student_id',
    },
    {
      title: '学生姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '异常类型',
      dataIndex: 'anomaly_type',
      key: 'anomaly_type',
      render: (text: string) => {
        let color = '';
        switch (text) {
          case '连续迟到':
            color = 'orange';
            break;
          case '频繁早退':
            color = 'red';
            break;
          case '座位使用异常':
            color = 'purple';
            break;
          default:
            color = 'blue';
        }
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: '发生次数',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: '最近发生时间',
      dataIndex: 'last_occurrence',
      key: 'last_occurrence',
      render: (text: string) => new Date(text).toLocaleString(),
    },
  ];

  return (
    <div style={{ 
      padding: 20, 
      background: 'linear-gradient(135deg, #f0f4f8 0%, #e9ecef 100%)', 
      minHeight: '100vh'
    }}>
      {/* 顶部标题和控制区 */}
      <div style={{ marginBottom: 32, textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: 'bold', 
          marginBottom: 24, 
          color: '#333'
        }}>
          学生出勤数据分析系统
        </h1>
        <Row gutter={16} justify="center" align="middle">
          <Col>
            <Select
              defaultValue="day"
              style={{ width: 120, marginRight: 16 }}
              onChange={setTimeRange}
            >
              <Option value="day">日</Option>
              <Option value="week">周</Option>
              <Option value="month">月</Option>
            </Select>
          </Col>
          <Col>
            <RangePicker 
              style={{ marginRight: 16 }}
              onChange={(dates) => {
                if (dates && dates[0] && dates[1]) {
                  setDateRange([dates[0].format('YYYY-MM-DD'), dates[1].format('YYYY-MM-DD')]);
                }
              }}
            />
          </Col>
          <Col>
            <Button 
              type="primary" 
              icon={<DownloadOutlined />} 
              onClick={handleExportData}
              loading={exportLoading}
              style={{ 
                background: 'linear-gradient(90deg, #722ed1, #1890ff)',
                border: 'none',
                boxShadow: '0 4px 12px rgba(114, 46, 209, 0.3)'
              }}
            >
              导出数据
            </Button>
          </Col>
        </Row>
      </div>
      
      {/* 统计卡片 */}
      <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
        <Col span={6}>
          <Card style={{ 
            background: 'white', 
            borderRadius: 16, 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: 'none'
          }}>
            <Statistic 
              title="总工位数" 
              value={usageData?.total_seats || 0} 
              styles={{ content: { color: '#1890ff' } }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ 
            background: 'white', 
            borderRadius: 16, 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: 'none'
          }}>
            <Statistic 
              title="当前使用工位" 
              value={usageData?.used_seats || 0} 
              styles={{ content: { color: '#52c41a' } }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ 
            background: 'white', 
            borderRadius: 16, 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: 'none'
          }}>
            <Statistic 
              title="使用率" 
              value={usageData?.usage_rate || 0} 
              suffix="%" 
              styles={{ content: { color: '#faad14' } }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ 
            background: 'white', 
            borderRadius: 16, 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: 'none'
          }}>
            <Statistic 
              title="总学生数" 
              value={attendanceData?.total_students || 0} 
              styles={{ content: { color: '#722ed1' } }}
            />
          </Card>
        </Col>
      </Row>
      
      {/* 主要图表区域 */}
      <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
        <Col span={12}>
          <Card style={{ 
            background: 'white', 
            borderRadius: 16, 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: 'none',
            height: 400
          }}>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 340 }}>
                <Spin size="large" />
              </div>
            ) : (
              <div ref={usageChartRef} style={{ width: '100%', height: 340 }} />
            )}
          </Card>
        </Col>
        <Col span={12}>
          <Card style={{ 
            background: 'white', 
            borderRadius: 16, 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: 'none',
            height: 400
          }}>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 340 }}>
                <Spin size="large" />
              </div>
            ) : (
              <div ref={attendanceChartRef} style={{ width: '100%', height: 340 }} />
            )}
          </Card>
        </Col>
      </Row>
      
      <Row gutter={[24, 24]} style={{ marginBottom: 32 }}>
        <Col span={16}>
          <Card style={{ 
            background: 'white', 
            borderRadius: 16, 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: 'none',
            height: 500
          }}>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 440 }}>
                <Spin size="large" />
              </div>
            ) : (
              <div ref={heatmapChartRef} style={{ width: '100%', height: 440 }} />
            )}
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ 
            background: 'white', 
            borderRadius: 16, 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: 'none',
            height: 500
          }}>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 440 }}>
                <Spin size="large" />
              </div>
            ) : (
              <div ref={classDistributionChartRef} style={{ width: '100%', height: 440 }} />
            )}
          </Card>
        </Col>
      </Row>
      
      {/* 异常行为检测 */}
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card style={{ 
            background: 'white', 
            borderRadius: 16, 
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            border: 'none'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ color: '#333', margin: 0, fontSize: 18, fontWeight: 'bold' }}>异常行为检测</h3>
              <span style={{ color: '#f5222d', fontSize: '14px' }}>
                共 {anomalyData?.length || 0} 条异常记录
              </span>
            </div>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
                <Spin size="large" />
              </div>
            ) : (
              <Table 
                columns={anomalyColumns} 
                dataSource={anomalyData} 
                rowKey="student_id" 
                pagination={{ pageSize: 10 }}
                scroll={{ x: 'max-content' }}
                tableLayout="fixed"
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Analytics;