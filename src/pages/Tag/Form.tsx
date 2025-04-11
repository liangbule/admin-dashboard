import React from 'react';
import { Card, Form, Input, Button, message, ColorPicker } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';

interface TagFormData {
  name: string;
  color: string;
}

const TagForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();

  const isEdit = !!id;

  const handleSubmit = async (values: TagFormData) => {
    try {
      // 这里应该是实际的API调用
      console.log('表单数据:', values);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      message.success(isEdit ? '更新成功' : '创建成功');
      navigate('/tag');
    } catch (err) {
      console.error('操作失败:', err);
      message.error('操作失败');
    }
  };

  return (
    <Card title={isEdit ? '编辑标签' : '创建标签'}>
      <Form<TagFormData>
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={isEdit ? { name: '测试标签', color: '#1890ff' } : {}}
      >
        <Form.Item
          name="name"
          label="名称"
          rules={[{ required: true, message: '请输入名称' }]}
        >
          <Input placeholder="请输入名称" />
        </Form.Item>

        <Form.Item
          name="color"
          label="颜色"
          rules={[{ required: true, message: '请选择颜色' }]}
        >
          <ColorPicker />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {isEdit ? '更新' : '创建'}
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => navigate('/tag')}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default TagForm; 