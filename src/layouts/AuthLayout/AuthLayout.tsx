import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Layout style={{ 
      minHeight: '100vh',
      width: '100%',
      background: 'linear-gradient(135deg, #1890ff 0%, #36cfc9 100%)'
    }}>
      <Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default AuthLayout; 