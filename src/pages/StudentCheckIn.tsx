import React, { useState } from 'react';
import { Form, Input, Button, message, Card } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { checkinAPI } from '../services/api';

const StudentCheckIn: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'checking' | 'checked_in' | 'checked_out'>('idle');

  // 从URL获取seat_id（扫码后会携带该参数）
  const getSeatIdFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('seat_id') || '';
  };

  const handleSubmit = async (values: { seat_id: string; student_id: string }) => {
    setLoading(true);
    try {
      if (status === 'idle' || status === 'checked_out') {
        // 签到
        const response = await checkinAPI.checkin(values);
        if (response.code === 200) {
          message.success('签到成功');
          setStatus('checked_in');
        } else {
          message.error(response.message);
        }
      } else if (status === 'checked_in') {
        // 签退
        const response = await checkinAPI.checkout(values);
        if (response.code === 200) {
          message.success('签退成功');
          setStatus('checked_out');
        } else {
          message.error(response.message);
        }
      }
    } catch (error) {
      message.error('操作失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f2f5' }}>
      <Card
        title={status === 'checked_in' ? '签退' : '签到'}
        style={{ width: 400, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}
      >
        {status === 'checked_in' && (
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <CheckCircleOutlined style={{ fontSize: 48, color: '#52c41a' }} />
            <p style={{ marginTop: 10, fontSize: 16, color: '#52c41a' }}>已签到</p>
          </div>
        )}
        {status === 'checked_out' && (
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <CloseCircleOutlined style={{ fontSize: 48, color: '#1890ff' }} />
            <p style={{ marginTop: 10, fontSize: 16, color: '#1890ff' }}>已签退</p>
          </div>
        )}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ seat_id: getSeatIdFromUrl() }}
        >
          <Form.Item
            name="seat_id"
            label="工位编号"
            rules={[{ required: true, message: '请输入工位编号' }]}
          >
            <Input placeholder="请输入工位编号" />
          </Form.Item>
          <Form.Item
            name="student_id"
            label="学号"
            rules={[{ required: true, message: '请输入学号' }]}
          >
            <Input placeholder="请输入学号" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              style={{ height: 40, fontSize: 16 }}
            >
              {status === 'checked_in' ? '签退' : '签到'}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default StudentCheckIn;