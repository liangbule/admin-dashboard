import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const AuthLayout: React.FC = () => {
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
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
};

export default AuthLayout; 