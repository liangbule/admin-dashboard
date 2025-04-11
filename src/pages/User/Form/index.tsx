import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, message, Card } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { userApi } from '@/services/api';
import type { UserInfo } from '@/services/api';

const { Option } = Select;

const UserForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);

  // 如果是编辑模式，获取用户信息
  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          setLoading(true);
          // 这里假设有一个获取单个用户信息的API
          const response = await userApi.getUsers({ page: 1, pageSize: 1 });
          const user = response.list.find(u => u.id === Number(id));
          if (user) {
            setUser(user);
            form.setFieldsValue({
              username: user.username,
              roles: user.roles,
            });
          }
        } catch (error) {
          message.error('获取用户信息失败');
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }
  }, [id, form]);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);
      if (id) {
        // 编辑用户
        await userApi.updateUser(Number(id), values);
        message.success('更新用户成功');
      } else {
        // 创建用户
        await userApi.createUser(values);
        message.success('创建用户成功');
      }
      navigate('/users');
    } catch (error) {
      message.error(id ? '更新用户失败' : '创建用户失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title={id ? '编辑用户' : '创建用户'}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ roles: ['user'] }}
      >
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            { required: true, message: '请输入用户名' },
            { min: 3, message: '用户名至少3个字符' }
          ]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>

        {!id && (
          <Form.Item
            name="password"
            label="密码"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码至少6个字符' }
            ]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
        )}

        <Form.Item
          name="roles"
          label="角色"
          rules={[{ required: true, message: '请选择角色' }]}
        >
          <Select mode="multiple" placeholder="请选择角色">
            <Option value="admin">管理员</Option>
            <Option value="editor">编辑</Option>
            <Option value="user">普通用户</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            {id ? '更新' : '创建'}
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => navigate('/users')}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default UserForm; 