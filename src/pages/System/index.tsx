import React from 'react';
import { Card, Form, Input, Button, message, Switch } from 'antd';

const System: React.FC = () => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      // 这里应该是实际的API调用
      console.log('表单数据:', values);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      message.success('更新成功');
    } catch (err) {
      console.error('更新失败:', err);
      message.error('更新失败');
    }
  };

  return (
    <Card title="系统设置">
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          siteName: '后台管理系统',
          siteDescription: '一个现代化的后台管理系统',
          enableRegistration: true,
          enableComment: true,
        }}
      >
        <Form.Item
          name="siteName"
          label="站点名称"
          rules={[{ required: true, message: '请输入站点名称' }]}
        >
          <Input placeholder="请输入站点名称" />
        </Form.Item>

        <Form.Item
          name="siteDescription"
          label="站点描述"
          rules={[{ required: true, message: '请输入站点描述' }]}
        >
          <Input.TextArea placeholder="请输入站点描述" />
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
          <Button type="primary" htmlType="submit">
            保存设置
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default System; 