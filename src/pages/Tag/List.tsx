import React, { useState, useEffect } from 'react';
import { Table, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

interface TagItem {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}

const TagList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TagItem[]>([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: unknown, record: TagItem) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (record: TagItem) => {
    console.log('Edit:', record);
  };

  const handleDelete = (record: TagItem) => {
    console.log('Delete:', record);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      const mockData: TagItem[] = [
        {
          id: 1,
          name: '示例标签',
          description: '这是一个示例标签',
          createdAt: '2024-01-01',
        },
      ];
      setData(mockData);
    } catch (error) {
      console.error('Error fetching tags:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [current, pageSize]);

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      loading={loading}
      pagination={{
        current,
        pageSize,
        onChange: (page, size) => {
          setCurrent(page);
          setPageSize(size);
        },
      }}
    />
  );
};

export default TagList; 