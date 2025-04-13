import React, { useState } from 'react';
import { Card, Button, Space } from 'antd';
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ content, onChange }) => {
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  // 定义代码块渲染组件
  const components = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          language={match[1]}
          PreTag="div"
          style={vscDarkPlus}
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
  };

  return (
    <Card>
      <Space style={{ marginBottom: 16 }}>
        <Button
          type={mode === 'edit' ? 'primary' : 'default'}
          icon={<EditOutlined />}
          onClick={() => setMode('edit')}
        >
          编辑
        </Button>
        <Button
          type={mode === 'preview' ? 'primary' : 'default'}
          icon={<EyeOutlined />}
          onClick={() => setMode('preview')}
        >
          预览
        </Button>
      </Space>

      {mode === 'edit' ? (
        <textarea
          value={content}
          onChange={handleContentChange}
          style={{
            width: '100%',
            minHeight: '500px',
            padding: '16px',
            fontFamily: 'monospace',
            border: '1px solid #d9d9d9',
            borderRadius: '4px',
          }}
        />
      ) : (
        <div style={{ padding: '16px' }}>
          <ReactMarkdown components={components}>
            {content}
          </ReactMarkdown>
        </div>
      )}
    </Card>
  );
};

export default MarkdownEditor; 