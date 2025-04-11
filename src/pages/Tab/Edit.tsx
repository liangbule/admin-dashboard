import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Switch, InputNumber, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { logger, LogType } from '@/utils/logger';

interface Tab {
  id: string;
  name: string;
  sort: number;
  status: boolean;
}

interface TabFormData {
  name: string;
  sort: number;
  status: boolean;
}

const TabEdit: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchTab = async () => {
      try {
        setLoading(true);
        logger.info(LogType.API, '开始获取标签页详情', { id });
        
        // TODO: 调用获取标签页详情的 API
        const tab: Tab = {
          id: id!,
          name: '示例标签页',
          sort: 0,
          status: true,
        };
        form.setFieldsValue(tab);
        logger.info(LogType.API, '获取标签页详情成功');
      } catch (error) {
        logger.error(LogType.API, '获取标签页详情失败', error as Error);
        message.error('获取标签页详情失败');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTab();
    }
  }, [id, form]);

  const handleSubmit = async (values: TabFormData) => {
    try {
      setLoading(true);
      logger.info(LogType.API, '开始更新标签页', { id, ...values });
      
      // TODO: 调用更新标签页的 API
      message.success('更新成功');
      logger.info(LogType.API, '更新标签页成功');
      
      navigate('/tab/list');
    } catch (error) {
      logger.error(LogType.API, '更新标签页失败', error as Error);
      message.error('更新失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>编辑标签页</h1>
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
        >
          <Switch checkedChildren="启用" unCheckedChildren="禁用" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            保存
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={() => navigate('/tab/list')}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TabEdit; 