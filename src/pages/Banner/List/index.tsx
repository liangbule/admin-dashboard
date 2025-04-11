import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Image, Modal, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getBanners, deleteBanner } from '@/services/banner';
import type { Banner } from '@/types/banner';

const BannerList: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const banners = await getBanners();
      setData(banners);
    } catch (err) {
      console.error('获取轮播图列表失败:', err);
      message.error('获取轮播图列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个轮播图吗？',
      onOk: async () => {
        try {
          await deleteBanner(id);
          message.success('删除成功');
          fetchData(); // 重新加载数据
        } catch (err) {
          console.error('删除失败:', err);
          message.error('删除失败');
        }
      },
    });
  };

  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '图片',
      dataIndex: 'image',
      key: 'image',
      render: (url: string) => (
        <Image
          src={url}
          alt="轮播图"
          width={100}
          height={50}
          style={{ objectFit: 'cover' }}
        />
      ),
    },
    {
      title: '链接',
      dataIndex: 'link',
      key: 'link',
      render: (link: string) => (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {link}
        </a>
      ),
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: boolean) => (
        <span style={{ color: status ? '#52c41a' : '#ff4d4f' }}>
          {status ? '启用' : '禁用'}
        </span>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: unknown, record: Banner) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate(`/banner/${record.id}/edit`)}
          >
            编辑
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/banner/create')}
        >
          添加轮播图
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={{
          total: data.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
      />
    </div>
  );
};

export default BannerList; 