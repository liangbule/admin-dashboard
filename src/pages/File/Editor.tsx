import React, { useState, useEffect } from 'react';
import { Card, Button, message, Input, Space } from 'antd';
import { SaveOutlined, FileOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;

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
  const navigate = useNavigate();

  useEffect(() => {
    if (filePath) {
      // 模拟从服务器获取文件内容
      fetchFileContent(filePath);
    }
  }, [filePath]);

  const fetchFileContent = async (path: string) => {
    try {
      // 这里应该是实际的API调用
      // 为了演示，我们使用模拟数据
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
      // 这里应该是实际的API调用
      // 为了演示，我们使用模拟数据
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

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
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
      <TextArea
        value={content}
        onChange={handleContentChange}
        placeholder="请输入文件内容"
        autoSize={{ minRows: 20, maxRows: 20 }}
        style={{ fontFamily: 'monospace' }}
      />
    </Card>
  );
};

export default FileEditor; 