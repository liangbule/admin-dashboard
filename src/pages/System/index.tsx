import React, { useState } from 'react';
import { Card, Form, Input, Button, message, Switch } from 'antd';

interface SystemConfig {
  siteName: string;
  siteDescription: string;
  enableRegistration: boolean;
  enableComment: boolean;
}

const System: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm<SystemConfig>();

  const handleSubmit = async (_values: SystemConfig) => {
    try {
      setLoading(true);
      // 这里应该是实际的API调用
      await new Promise((resolve) => setTimeout(resolve, 500));
      message.success('保存成功');
    } catch (error) {
      message.error('保存失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="系统设置">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          siteName: '管理后台',
          siteDescription: '一个简单的管理后台',
          enableRegistration: true,
          enableComment: true,
        }}
      >
        <Form.Item
          name="siteName"
          label="站点名称"
          rules={[{ required: true, message: '请输入站点名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="siteDescription"
          label="站点描述"
          rules={[{ required: true, message: '请输入站点描述' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="enableRegistration"
          label="允许注册"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item
          name="enableComment"
          label="允许评论"
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            保存
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default System; 