import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Button, DatePicker, message, Select, Modal } from 'antd';
import { DownloadOutlined, LogoutOutlined } from '@ant-design/icons';
import { teacherAPI, authAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { RangePicker } = DatePicker;

const TeacherDashboard: React.FC = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [records, setRecords] = useState<any[]>([]);
  const [recordLoading, setRecordLoading] = useState(false);
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  // 模拟教师ID（实际应该从认证信息中获取）
  const teacherId = '1';

  // 加载学生列表
  const loadStudents = async () => {
    setLoading(true);
    try {
      const response = await teacherAPI.getStudents(teacherId);
      if (response.code === 200) {
        setStudents(response.data);
      }
    } catch (error) {
      console.error('加载学生列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 加载学生出勤记录
  const loadStudentRecords = async (student: any) => {
    setRecordLoading(true);
    try {
      const params: any = {};
      if (dateRange) {
        params.start_date = dateRange[0];
        params.end_date = dateRange[1];
      }
      const response = await teacherAPI.getStudentRecords(student.student_id, params, teacherId);
      if (response.code === 200) {
        setRecords(response.data);
        setSelectedStudent(student);
        setModalVisible(true);
      }
    } catch (error) {
      console.error('加载出勤记录失败:', error);
    } finally {
      setRecordLoading(false);
    }
  };

  // 导出数据
  const exportData = async () => {
    try {
      const params: any = {};
      if (dateRange) {
        params.start_date = dateRange[0];
        params.end_date = dateRange[1];
      }
      const blob = await teacherAPI.exportData(params, teacherId);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `attendance_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      message.success('导出成功');
    } catch (error) {
      message.error('导出失败');
    }
  };

  // 登出
  const handleLogout = async () => {
    try {
      const { error } = await authAPI.logout();
      if (error) {
        message.error(error.message);
      } else {
        message.success('登出成功');
        navigate('/teacher/login');
      }
    } catch (error) {
      message.error('登出失败');
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const columns = [
    {
      title: '学号',
      dataIndex: 'student_id',
      key: 'student_id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '班级',
      dataIndex: 'class',
      key: 'class',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button type="primary" onClick={() => loadStudentRecords(record)}>
          查看出勤
        </Button>
      ),
    },
  ];

  const recordColumns = [
    {
      title: '签到时间',
      dataIndex: 'check_in_time',
      key: 'check_in_time',
    },
    {
      title: '签退时间',
      dataIndex: 'check_out_time',
      key: 'check_out_time',
    },
    {
      title: '时长(分钟)',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: '工位',
      dataIndex: 'seat_id',
      key: 'seat_id',
    },
  ];

  return (
    <div style={{ padding: 20, background: '#f0f2f5', minHeight: '100vh' }}>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <h1 style={{ margin: 0 }}>教师管理后台</h1>
        </Col>
        <Col>
          <Row gutter={16} align="middle">
            <Col>
              <RangePicker
                onChange={(dates) => {
                  if (dates) {
                    setDateRange([dates[0].toISOString(), dates[1].toISOString()]);
                  } else {
                    setDateRange(null);
                  }
                }}
              />
            </Col>
            <Col>
              <Button type="primary" icon={<DownloadOutlined />} onClick={exportData}>
                导出数据
              </Button>
            </Col>
            <Col>
              <Button icon={<LogoutOutlined />} onClick={handleLogout}>
                登出
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Card title="学生列表">
        <Table
          columns={columns}
          dataSource={students}
          rowKey="student_id"
          loading={loading}
          pagination={{ pageSize: 10 }}
        />
      </Card>
      <Modal
        title={`${selectedStudent?.name}的出勤记录`}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={800}
      >
        <Table
          columns={recordColumns}
          dataSource={records}
          rowKey="id"
          loading={recordLoading}
          pagination={{ pageSize: 10 }}
        />
      </Modal>
    </div>
  );
};

export default TeacherDashboard;