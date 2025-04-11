import React from 'react';
import { Card, Form, Input, Button, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

const TabForm: React.FC = () => {
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
      navigate('/tab');
    } catch (err) {
      console.error('操作失败:', err);
      message.error('操作失败');
    }
  };

  return (
    <Card title={isEdit ? '编辑标签页' : '创建标签页'}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={isEdit ? { name: '测试标签页', icon: 'home' } : {}}
      >
        <Form.Item
          name="name"
          label="名称"
          rules={[{ required: true, message: '请输入名称' }]}
        >
          <Input placeholder="请输入名称" />
        </Form.Item>

        <Form.Item
          name="icon"
          label="图标"
          rules={[{ required: true, message: '请输入图标' }]}
        >
          <Input placeholder="请输入图标" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {isEdit ? '更新' : '创建'}
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => navigate('/tab')}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default TabForm; 