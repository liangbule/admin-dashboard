import React from 'react';
import { Card, Form, Input, Button, message, Upload } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';

const BannerForm: React.FC = () => {
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
      navigate('/banner');
    } catch (err) {
      console.error('操作失败:', err);
      message.error('操作失败');
    }
  };

  return (
    <Card title={isEdit ? '编辑轮播图' : '创建轮播图'}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={isEdit ? { title: '测试轮播图', link: 'https://example.com' } : {}}
      >
        <Form.Item
          name="title"
          label="标题"
          rules={[{ required: true, message: '请输入标题' }]}
        >
          <Input placeholder="请输入标题" />
        </Form.Item>

        <Form.Item
          name="link"
          label="链接"
          rules={[{ required: true, message: '请输入链接' }]}
        >
          <Input placeholder="请输入链接" />
        </Form.Item>

        <Form.Item
          name="image"
          label="图片"
          rules={[{ required: true, message: '请上传图片' }]}
        >
          <Upload
            listType="picture"
            maxCount={1}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>上传图片</Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {isEdit ? '更新' : '创建'}
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => navigate('/banner')}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default BannerForm; 