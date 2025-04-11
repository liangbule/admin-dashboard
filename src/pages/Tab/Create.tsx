import React, { useState } from 'react';
import { Form, Input, Button, Switch, InputNumber, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { logger, LogType } from '@/utils/logger';

interface TabFormData {
  name: string;
  sort: number;
  status: boolean;
}

const TabCreate: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values: TabFormData) => {
    try {
      setLoading(true);
      logger.info(LogType.API, '开始创建标签页', values);
      
      // TODO: 调用创建标签页的 API
      message.success('创建成功');
      logger.info(LogType.API, '创建标签页成功');
      
      navigate('/tab/list');
    } catch (error) {
      logger.error(LogType.API, '创建标签页失败', error as Error);
      message.error('创建失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>创建标签页</h1>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        style={{ maxWidth: 600 }}
      >
        <Form.Item
          name="name"
          label="名称"
          rules={[{ required: true, message: '请输入名称' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="sort"
          label="排序"
          rules={[{ required: true, message: '请输入排序' }]}
        >
          <InputNumber min={0} />
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
          <Button style={{ marginLeft: 8 }} onClick={() => navigate('/tab/list')}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TabCreate; 