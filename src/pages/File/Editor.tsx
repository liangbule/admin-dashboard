import React, { useState, useEffect } from 'react';
import { Card, Button, message, Space } from 'antd';
import { SaveOutlined, FileOutlined } from '@ant-design/icons';
import MarkdownEditor from './MarkdownEditor';

interface FileEditorProps {
  filePath?: string;
}

interface FileResponse {
  content: string;
  name: string;
}

const FileEditor: React.FC<FileEditorProps> = ({ filePath }) => {
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    if (filePath) {
      fetchFileContent(filePath);
    }
  }, [filePath]);

  const fetchFileContent = async (path: string) => {
    try {
      const response = await new Promise<FileResponse>((resolve) => {
        setTimeout(() => {
          resolve({
            content: '// 文件内容示例\nconst example = "Hello World";',
            name: path.split('/').pop() || 'untitled.txt'
          });
        }, 500);
      });

      setContent(response.content);
      setFileName(response.name);
    } catch (err) {
      message.error('获取文件内容失败');
    }
  };

  const handleSave = async () => {
    try {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 500);
      });

      message.success('文件保存成功');
    } catch (err) {
      message.error('文件保存失败');
    }
  };

  return (
    <Card
      title={
        <Space>
          <FileOutlined />
          <span>{fileName || '新文件'}</span>
        </Space>
      }
      extra={
        <Button
          type="primary"
          icon={<SaveOutlined />}
          onClick={handleSave}
        >
          保存
        </Button>
      }
    >
      <MarkdownEditor content={content} onChange={setContent} />
    </Card>
  );
};

export default FileEditor; 