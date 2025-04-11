import React from 'react';
import { Form, Input, Button, Card } from 'antd';

interface SettingsFormValues {
  siteName: string;
  siteDescription: string;
}

const SystemSettings: React.FC = () => {
  const onFinish = (values: SettingsFormValues) => {
    console.log('Received values:', values);
    // TODO: 实现系统设置保存逻辑
  };

  return (
    <Card title="系统设置">
      <Form<SettingsFormValues>
        name="settings"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="siteName"
          label="站点名称"
          rules={[{ required: true, message: '请输入站点名称！' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="siteDescription"
          label="站点描述"
          rules={[{ required: true, message: '请输入站点描述！' }]}
        >
          <Input.TextArea />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            保存设置
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SystemSettings; 