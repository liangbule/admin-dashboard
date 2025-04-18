import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from '@/store/slices/authSlice';
import { userApi } from '@/services/api';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: { username: string; password: string }) => {
    try {
      setLoading(true);
      console.log('开始登录，参数：', values);
      
      const response = await userApi.login(values);
      console.log('登录响应：', response);
      
      if (response && response.access_token) {
        dispatch(setToken(response.access_token));
        localStorage.setItem('admin_token', response.access_token);
        
        localStorage.setItem('userInfo', JSON.stringify(response.user));
        
        message.success('登录成功');
        navigate('/', { replace: true });
      } else {
        throw new Error('登录失败：未获取到token');
      }
    } catch (err: unknown) {
      console.error('登录失败:', err);
      const errorMessage = err instanceof Error ? err.message : '登录失败，请检查用户名和密码';
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: '24px',
      background: 'linear-gradient(135deg, #1890ff 0%, #36cfc9 100%)',
    }}>
      <div style={{ 
        width: '100%',
        maxWidth: 400,
        background: '#fff',
        padding: '40px',
        borderRadius: 8,
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
      }}>
        <h1 style={{ 
          fontSize: 28, 
          marginBottom: 24, 
          color: '#1890ff',
          textAlign: 'center'
        }}>
          后台管理系统
        </h1>
        <Form
          name="login"
          onFinish={handleSubmit}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: '请输入用户名！' },
              { min: 3, message: '用户名长度不能少于3个字符！' }
            ]}
          >
            <Input 
              prefix={<UserOutlined style={{ color: '#1890ff' }} />}
              placeholder="用户名" 
              style={{ height: 40 }}
              autoComplete="username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              { required: true, message: '请输入密码！' },
              { min: 6, message: '密码长度不能少于6个字符！' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: '#1890ff' }} />}
              placeholder="密码"
              style={{ height: 40 }}
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              block
              style={{ 
                height: 40,
                fontSize: 16,
                marginTop: 8
              }}
            >
              登录
            </Button>
          </Form.Item>
        </Form>
        <div style={{ 
          marginTop: 24, 
          color: '#999',
          textAlign: 'center'
        }}>
          © 2024 后台管理系统
        </div>
      </div>
    </div>
  );
};

export default Login; 