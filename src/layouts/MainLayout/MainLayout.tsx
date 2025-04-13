import React, { useState } from 'react';
import { Layout, Menu, theme, Dropdown, Space, Avatar, Image } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearToken } from '@/store/slices/authSlice';
import {
  DashboardOutlined,
  UserOutlined,
  FileOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  PictureOutlined,
  TagsOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import logo from '@/assets/logo.svg';
import './MainLayout.less';

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(clearToken());
    navigate('/login');
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout,
    },
  ];

  const menuItems: MenuProps['items'] = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: '仪表盘',
    },
    {
      key: '/users',
      icon: <UserOutlined />,
      label: '用户管理',
      children: [
        {
          key: '/users',
          label: '用户列表',
        },
        {
          key: '/users/create',
          label: '创建用户',
        },
      ],
    },
    {
      key: '/tag',
      icon: <TagsOutlined />,
      label: '标签管理',
      children: [
        {
          key: '/tag',
          label: '标签列表',
        },
        {
          key: '/tag/create',
          label: '创建标签',
        },
      ],
    },
    {
      key: '/banner',
      icon: <PictureOutlined />,
      label: 'Banner管理',
      children: [
        {
          key: '/banner',
          label: 'Banner列表',
        },
        {
          key: '/banner/create',
          label: '创建Banner',
        },
      ],
    },
    {
      key: '/file',
      icon: <FileOutlined />,
      label: '文件管理',
    },
    {
      key: '/system',
      icon: <SettingOutlined />,
      label: '系统设置',
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        className="main-sider"
      >
        <div className="logo-container">
          <Image 
            src={logo} 
            preview={false}
            className="logo"
          />
          {!collapsed && <span className="logo-text">管理后台</span>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} className="main-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 16px' }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Space style={{ cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} />
                <span>管理员</span>
              </Space>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            width: '100%',
            maxWidth: '100%',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 