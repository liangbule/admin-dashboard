import React, { useState, useEffect } from 'react';
import { Card, Button, message, Input, Space, Tabs } from 'antd';
import { SaveOutlined, FileOutlined, EyeOutlined, EditOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const { TextArea } = Input;
const { TabPane } = Tabs;

interface MarkdownEditorProps {
  filePath?: string;
}

interface FileResponse {
  content: string;
  name: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ filePath }) => {
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [activeTab, setActiveTab] = useState('edit');

  useEffect(() => {
    if (filePath) {
      fetchFileContent(filePath);
    }
  }, [filePath]);

  const fetchFileContent = async (path: string) => {
    try {
      // 这里应该是实际的API调用
      const response = await new Promise<FileResponse>((resolve) => {
        setTimeout(() => {
          resolve({
            content: '# Markdown 示例\n\n```javascript\nconst example = "Hello World";\n```\n\n- 列表项 1\n- 列表项 2\n\n> 引用文本\n\n**粗体文本**',
            name: path.split('/').pop() || 'untitled.md'
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

  const components = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
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
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: 'edit',
            label: (
              <span>
                <EditOutlined />
                编辑
              </span>
            ),
            children: (
              <TextArea
                value={content}
                onChange={handleContentChange}
                placeholder="请输入 Markdown 内容"
                autoSize={{ minRows: 20, maxRows: 20 }}
                style={{ fontFamily: 'monospace' }}
              />
            ),
          },
          {
            key: 'preview',
            label: (
              <span>
                <EyeOutlined />
                预览
              </span>
            ),
            children: (
              <div style={{ padding: '16px', background: '#fff' }}>
                <ReactMarkdown components={components}>
                  {content}
                </ReactMarkdown>
              </div>
            ),
          },
        ]}
      />
    </Card>
  );
};

export default MarkdownEditor; 