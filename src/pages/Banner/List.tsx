import React, { useState } from 'react';
import { Table, Button, Space, Image, Modal, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface BannerItem {
  id: string;
  title: string;
  imageUrl: string;
  link: string;
  sort: number;
  status: boolean;
}

const BannerList: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<BannerItem[]>([
    {
      id: '1',
      title: '示例轮播图1',
      imageUrl: 'https://via.placeholder.com/800x400',
      link: 'https://example.com',
      sort: 1,
      status: true,
    },
    {
      id: '2',
      title: '示例轮播图2',
      imageUrl: 'https://via.placeholder.com/800x400',
      link: 'https://example.com',
      sort: 2,
      status: true,
    },
  ]);

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个轮播图吗？',
      onOk: () => {
        setData(data.filter(item => item.id !== id));
        message.success('删除成功');
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
      dataIndex: 'imageUrl',
      key: 'imageUrl',
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
      render: (_: unknown, record: BannerItem) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate(`/banner/edit/${record.id}`, { replace: true })}
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
          onClick={() => navigate('/banner/edit')}
        >
          添加轮播图
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
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