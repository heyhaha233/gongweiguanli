import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { authAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

const TeacherLogin: React.FC = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const { data, error } = await authAPI.login(values.email, values.password);
      if (error) {
        message.error(error.message);
      } else {
        message.success('登录成功');
        navigate('/teacher/dashboard');
      }
    } catch (error) {
      message.error('登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f2f5' }}>
      <Card title="教师登录" style={{ width: 400, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)' }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{ email: 'zhangsan@example.com', password: '123456' }}
        >
          <Form.Item
            name="email"
            label="邮箱"
            rules={[{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入有效的邮箱地址' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              style={{ height: 40, fontSize: 16 }}
            >
              登录
            </Button>
          </Form.Item>
          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <p>测试账号：zhangsan@example.com / 123456</p>
            <p>或：lisi@example.com / 123456</p>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default TeacherLogin;