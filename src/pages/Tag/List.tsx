import React, { useState } from 'react';
import { Card, Table, Button, Space, Tag, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';

interface TagItem {
  id: string;
  name: string;
  color: string;
}

const TagList: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<TagItem[]>([
    {
      id: '1',
      name: '测试标签1',
      color: '#1890ff',
    },
    {
      id: '2',
      name: '测试标签2',
      color: '#52c41a',
    },
  ]);

  const handleDelete = (id: string) => {
    setData(data.filter(item => item.id !== id));
    message.success('删除成功');
  };

  const columns = [
    {
      title: '标签名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: TagItem) => (
        <Tag color={record.color}>{text}</Tag>
      ),
    },
    {
      title: '颜色',
      dataIndex: 'color',
      key: 'color',
      render: (color: string) => (
        <div style={{ 
          width: 20, 
          height: 20, 
          backgroundColor: color,
          borderRadius: '50%'
        }} />
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: TagItem) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate(`/tag/${record.id}/edit`)}
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
    <Card 
      title="标签管理"
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate('/tag/create')}
        >
          创建标签
        </Button>
      }
    >
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
      />
    </Card>
  );
};

export default TagList; 