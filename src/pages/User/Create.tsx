import React, { useState } from 'react';
import { Form, Input, Button, Select, Switch, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { logger, LogType } from '@/utils/logger';

interface UserFormData {
  username: string;
  password: string;
  role: string;
  status: boolean;
}

const UserCreate: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values: UserFormData) => {
    try {
      setLoading(true);
      logger.info(LogType.API, '开始创建用户', values);
      
      // TODO: 调用创建用户的 API
      message.success('创建成功');
      logger.info(LogType.API, '创建用户成功');
      
      navigate('/user/list');
    } catch (error) {
      logger.error(LogType.API, '创建用户失败', error as Error);
      message.error('创建失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>创建用户</h1>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            { required: true, message: '请输入用户名' },
            { min: 3, message: '用户名长度不能少于3个字符' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="密码"
          rules={[
            { required: true, message: '请输入密码' },
            { min: 6, message: '密码长度不能少于6个字符' }
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="role"
          label="角色"
          rules={[{ required: true, message: '请选择角色' }]}
        >
          <Select>
            <Select.Option value="admin">管理员</Select.Option>
            <Select.Option value="user">普通用户</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="status"
          label="状态"
          valuePropName="checked"
          initialValue={true}
        >
          <Switch checkedChildren="启用" unCheckedChildren="禁用" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            创建
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => navigate('/user/list')}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserCreate; 