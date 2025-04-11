import React from 'react';
import { Card, Form, Input, Button, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

const UserForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();

  const isEdit = !!id;

  const handleSubmit = async (values: any) => {
    try {
      // 这里应该是实际的API调用
      console.log('表单数据:', values);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      message.success(isEdit ? '更新成功' : '创建成功');
      navigate('/users');
    } catch (err) {
      console.error('操作失败:', err);
      message.error('操作失败');
    }
  };

  return (
    <Card title={isEdit ? '编辑用户' : '创建用户'}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={isEdit ? { name: '测试用户', email: 'test@example.com' } : {}}
      >
        <Form.Item
          name="name"
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
            { type: 'email', message: '请输入有效的邮箱地址' }
          ]}
        >
          <Input placeholder="请输入邮箱" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {isEdit ? '更新' : '创建'}
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