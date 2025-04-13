import React, { useState, useEffect, useCallback } from 'react';
import { Card, Form, Input, Button, message, Upload, InputNumber, Switch } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { UploadOutlined } from '@ant-design/icons';
import { createBanner, updateBanner, getBanner } from '@/services/banner';
import type { BannerFormData } from '@/types/banner';

interface BannerFormProps {
  isEdit?: boolean;
}

const BannerForm: React.FC<BannerFormProps> = ({ isEdit = false }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchBannerData = useCallback(async () => {
    if (!isEdit || !id) return;
    
    setLoading(true);
    try {
      const banner = await getBanner(id!);
      form.setFieldsValue(banner);
    } catch (error) {
      message.error('获取横幅数据失败');
    } finally {
      setLoading(false);
    }
  }, [form, id, isEdit]);

  useEffect(() => {
    fetchBannerData();
  }, [fetchBannerData]);

  const handleSubmit = async (values: BannerFormData) => {
    setLoading(true);
    try {
      setSubmitting(true);
      if (isEdit) {
        await updateBanner(id!, values);
        message.success('更新成功');
      } else {
        await createBanner(values);
        message.success('创建成功');
      }
      navigate('/banner');
    } catch (error) {
      message.error(`${isEdit ? '更新' : '创建'}失败`);
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <Card 
      title={isEdit ? '编辑轮播图' : '创建轮播图'}
      loading={loading}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          status: true,
          sort: 0,
        }}
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
          rules={[
            { required: true, message: '请输入链接' },
            { type: 'url', message: '请输入有效的URL' }
          ]}
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

        <Form.Item
          name="sort"
          label="排序"
          rules={[{ required: true, message: '请输入排序值' }]}
        >
          <InputNumber min={0} placeholder="请输入排序值" style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          name="status"
          label="状态"
          valuePropName="checked"
        >
          <Switch checkedChildren="启用" unCheckedChildren="禁用" />
        </Form.Item>

        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit"
            loading={submitting}
            style={{ marginRight: 8 }}
          >
            {isEdit ? '更新' : '创建'}
          </Button>
          <Button onClick={() => navigate('/banner')}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default BannerForm; 