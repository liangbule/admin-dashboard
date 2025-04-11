import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, Switch, message, Card, Space } from 'antd';
import { UploadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';

interface BannerFormData {
  title: string;
  imageUrl: string;
  link: string;
  sort: number;
  status: boolean;
}

const BannerEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      // 模拟获取轮播图数据
      setLoading(true);
      setTimeout(() => {
        form.setFieldsValue({
          title: '示例轮播图',
          imageUrl: 'https://via.placeholder.com/800x400',
          link: 'https://example.com',
          sort: 1,
          status: true,
        });
        setLoading(false);
      }, 500);
    }
  }, [id, form]);

  const handleSubmit = async (values: BannerFormData) => {
    try {
      setLoading(true);
      // 这里应该是实际的API调用
      console.log('提交的数据:', values);
      await new Promise(resolve => setTimeout(resolve, 500));
      message.success(id ? '更新成功' : '创建成功');
      navigate('/banner/list', { replace: true });
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
            onClick={() => navigate('/banner/list', { replace: true })}
          >
            返回列表
          </Button>
          <span>{id ? '编辑轮播图' : '添加轮播图'}</span>
        </Space>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          sort: 1,
          status: true,
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
          name="imageUrl"
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
          name="link"
          label="链接"
          rules={[
            { required: true, message: '请输入链接' },
            { type: 'url', message: '请输入有效的URL' },
          ]}
        >
          <Input placeholder="请输入链接" />
        </Form.Item>

        <Form.Item
          name="sort"
          label="排序"
          rules={[{ required: true, message: '请输入排序' }]}
        >
          <Input type="number" placeholder="请输入排序" />
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
            {id ? '保存' : '创建'}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default BannerEdit; 