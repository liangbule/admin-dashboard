import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Card, Space, ColorPicker } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

interface TagFormData {
  name: string;
  color: string;
  description: string;
}

const TagEdit: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      // 模拟获取标签数据
      setLoading(true);
      setTimeout(() => {
        form.setFieldsValue({
          name: '示例标签',
          color: '#f50',
          description: '这是一个示例标签',
        });
        setLoading(false);
      }, 500);
    }
  }, [id, form]);

  // 处理导航
  const handleNavigate = (path: string) => {
    if (location.pathname === path) {
      return;
    }
    navigate(path, { replace: true });
  };

  const handleSubmit = async (values: TagFormData) => {
    try {
      setLoading(true);
      // 这里应该是实际的API调用
      console.log('提交的数据:', values);
      await new Promise(resolve => setTimeout(resolve, 500));
      message.success(id ? '更新成功' : '创建成功');
      handleNavigate('/tag/list');
    } catch (err) {
      console.error('提交失败:', err);
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
            onClick={() => handleNavigate('/tag/list')}
          >
            返回列表
          </Button>
          <span>{id ? '编辑标签' : '添加标签'}</span>
        </Space>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          color: '#f50',
        }}
      >
        <Form.Item
          name="name"
          label="标签名称"
          rules={[{ required: true, message: '请输入标签名称' }]}
        >
          <Input placeholder="请输入标签名称" />
        </Form.Item>

        <Form.Item
          name="color"
          label="标签颜色"
          rules={[{ required: true, message: '请选择标签颜色' }]}
        >
          <ColorPicker />
        </Form.Item>

        <Form.Item
          name="description"
          label="描述"
          rules={[{ required: true, message: '请输入描述' }]}
        >
          <Input.TextArea placeholder="请输入描述" rows={4} />
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

export default TagEdit; 