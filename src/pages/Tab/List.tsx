import React, { useState, useEffect } from 'react';
import { Table, Button, Space, message, Popconfirm, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, PictureOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { logger, LogType } from '@/utils/logger';

interface Tab {
  id: string;
  name: string;
  sort: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

const TabList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [tabs, setTabs] = useState<Tab[]>([]);
  const navigate = useNavigate();

  const fetchTabs = async () => {
    try {
      setLoading(true);
      logger.info(LogType.API, '开始获取标签页列表');
      // TODO: 调用获取标签页列表的 API
      const response: Tab[] = [];
      setTabs(response);
      logger.info(LogType.API, '获取标签页列表成功', { count: response.length });
    } catch (error) {
      logger.error(LogType.API, '获取标签页列表失败', error as Error);
      message.error('获取标签页列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTabs();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      logger.info(LogType.API, '开始删除标签页', { id });
      // TODO: 调用删除标签页的 API
      message.success('删除成功');
      logger.info(LogType.API, '删除标签页成功', { id });
      fetchTabs();
    } catch (error) {
      logger.error(LogType.API, '删除标签页失败', error as Error);
      message.error('删除失败');
    }
  };

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
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
        <Tag color={status ? 'success' : 'error'}>
          {status ? '启用' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Tab) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate(`/tab/edit/${record.id}`)}
          >
            编辑
          </Button>
          <Button
            type="primary"
            icon={<PictureOutlined />}
            onClick={() => navigate(`/tab/banner/list?tabId=${record.id}`)}
          >
            轮播图
          </Button>
          <Popconfirm
            title="确定要删除这个标签页吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="primary" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
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
          onClick={() => navigate('/tab/create')}
        >
          添加标签页
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={tabs}
        rowKey="id"
        loading={loading}
      />
    </div>
  );
};

export default TabList; 