import React from 'react';
import { Card, Table, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const FileList: React.FC = () => {
  const columns = [
    {
      title: '文件名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '大小',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: '上传时间',
      dataIndex: 'uploadTime',
      key: 'uploadTime',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Button type="link" danger>
          删除
        </Button>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: '测试文件1.pdf',
      size: '2.5MB',
      uploadTime: '2024-01-01 12:00:00',
    },
    {
      key: '2',
      name: '测试文件2.jpg',
      size: '1.8MB',
      uploadTime: '2024-01-02 14:30:00',
    },
  ];

  return (
    <Card title="文件管理">
      <div style={{ marginBottom: 16 }}>
        <Upload
          beforeUpload={() => false}
          showUploadList={false}
        >
          <Button type="primary" icon={<UploadOutlined />}>
            上传文件
          </Button>
        </Upload>
      </div>
      <Table columns={columns} dataSource={data} />
    </Card>
  );
};

export default FileList; 