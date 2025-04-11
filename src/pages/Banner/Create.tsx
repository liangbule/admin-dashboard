import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { logger, LogType } from '@/utils/logger';

interface BannerFormValues {
  title: string;
  imageUrl: string;
  linkUrl: string;
  description?: string;
}

const BannerCreate: React.FC = () => {
  const [form] = Form.useForm<BannerFormValues>();
  const navigate = useNavigate();

  const onFinish = async (values: BannerFormValues) => {
    try {
      logger.info(LogType.API, '创建轮播图', values);
      // TODO: 调用创建 API
      message.success('创建成功');
      navigate('/tab/banner/list');
    } catch (error: unknown) {
      logger.error(LogType.API, '创建轮播图失败', error instanceof Error ? error : new Error(String(error)));
      message.error('创建失败');
    }
  };

  return (
    <div className="content">
      <h2>创建轮播图</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          name="title"
          label="标题"
          rules={[{ required: true, message: '请输入标题' }]}
        >
          <Input placeholder="请输入标题" />
        </Form.Item>
        <Form.Item
          name="imageUrl"
          label="图片地址"
          rules={[{ required: true, message: '请输入图片地址' }]}
        >
          <Input placeholder="请输入图片地址" />
        </Form.Item>
        <Form.Item
          name="linkUrl"
          label="链接地址"
          rules={[{ required: true, message: '请输入链接地址' }]}
        >
          <Input placeholder="请输入链接地址" />
        </Form.Item>
        <Form.Item
          name="description"
          label="描述"
        >
          <Input.TextArea placeholder="请输入描述" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            创建
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => navigate('/tab/banner/list')}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BannerCreate; 