import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Card, Space, Select, Switch } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { logger, LogType } from '@/utils/logger';

const { Option } = Select;

interface UserFormData {
  username: string;
  email: string;
  role: string;
  status: boolean;
}

const UserEdit: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchUser(id);
    }
  }, [id]);

  const fetchUser = async (userId: string) => {
    try {
      setLoading(true);
      logger.info(LogType.API, '开始获取用户信息', { userId });
      // TODO: 调用获取用户信息的 API
      const userData = {
        username: 'test',
        email: 'test@example.com',
        role: 'admin',
        status: true
      };
      form.setFieldsValue(userData);
      logger.info(LogType.API, '获取用户信息成功', { userId });
    } catch (error) {
      logger.error(LogType.API, '获取用户信息失败', error as Error);
      message.error('获取用户信息失败');
    } finally {
      setLoading(false);
    }
  };

  // 处理导航
  const handleNavigate = (path: string) => {
    if (location.pathname === path) {
      return;
    }
    navigate(path, { replace: true });
  };

  const handleSubmit = async (values: UserFormData) => {
    try {
      setLoading(true);
      logger.info(LogType.API, '开始更新用户信息', { id, values });
      // TODO: 调用更新用户信息的 API
      console.log('提交的数据:', values);
      await new Promise(resolve => setTimeout(resolve, 500));
      message.success(id ? '更新成功' : '创建成功');
      logger.info(LogType.API, '更新用户信息成功', { id });
      handleNavigate('/user/list');
    } catch (error) {
      logger.error(LogType.API, '更新用户信息失败', error as Error);
      message.error(id ? '更新失败' : '创建失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      title={
        <Space>
          <Button
            type="link"
            icon={<ArrowLeftOutlined />}
            onClick={() => handleNavigate('/user/list')}
          >
            返回列表
          </Button>
          <span>{id ? '编辑用户' : '添加用户'}</span>
        </Space>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          role: 'user',
          status: true,
        }}
      >
        <Form.Item
          name="username"
          label="用户名"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            { required: true, message: '请输入邮箱' },
            { type: 'email', message: '请输入有效的邮箱地址' },
          ]}
        >
          <Input placeholder="请输入邮箱" />
        </Form.Item>

        <Form.Item
          name="role"
          label="角色"
          rules={[{ required: true, message: '请选择角色' }]}
        >
          <Select placeholder="请选择角色">
            <Option value="admin">管理员</Option>
            <Option value="user">普通用户</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="status"
          label="状态"
          valuePropName="checked"
        >
          <Switch checkedChildren="启用" unCheckedChildren="禁用" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {id ? '保存' : '创建'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UserEdit; 