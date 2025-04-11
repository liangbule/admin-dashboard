import { lazy, Suspense } from 'react';
import { RouteObject, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import SystemSettings from '../pages/System/Settings';
import MarkdownEditor from '../pages/File/MarkdownEditor';
import PrivateRoute from '../components/PrivateRoute';
import TagManagement from '../pages/Tag';
import UserManagement from '../pages/User';
import BannerManagement from '../pages/Banner';
import { Spin } from 'antd';

// 使用 lazy 加载的组件
const TabList = lazy(() => import('../pages/Tab/List'));
const TabCreate = lazy(() => import('../pages/Tab/Create'));
const TabEdit = lazy(() => import('../pages/Tab/Edit'));
const BannerList = lazy(() => import('../pages/Banner/List'));
const BannerCreate = lazy(() => import('../pages/Banner/Create'));
const BannerEdit = lazy(() => import('../pages/Banner/Edit'));
const UserListPage = lazy(() => import('../pages/User/List'));
const UserCreatePage = lazy(() => import('../pages/User/Create'));
const UserEditPage = lazy(() => import('../pages/User/Edit'));
const TagList = lazy(() => import('../pages/Tag/List'));
const TagEdit = lazy(() => import('../pages/Tag/Edit'));

// 加载中组件
const Loading = () => (
  <div style={{ padding: '50px', textAlign: 'center' }}>
    <Spin size="large" />
  </div>
);

export const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'users',
        element: <UserManagement />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loading />}>
                <UserListPage />
              </Suspense>
            ),
          },
          {
            path: 'create',
            element: (
              <Suspense fallback={<Loading />}>
                <UserCreatePage />
              </Suspense>
            ),
          },
          {
            path: 'edit/:id',
            element: (
              <Suspense fallback={<Loading />}>
                <UserEditPage />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'file',
        children: [
          {
            path: 'edit',
            element: <MarkdownEditor />,
          },
          {
            path: 'edit/:filePath',
            element: <MarkdownEditor />,
          },
        ],
      },
      {
        path: 'system',
        children: [
          {
            path: 'settings',
            element: <SystemSettings />,
          },
        ],
      },
      {
        path: 'tab',
        children: [
          {
            path: 'list',
            element: (
              <Suspense fallback={<Loading />}>
                <TabList />
              </Suspense>
            ),
          },
          {
            path: 'create',
            element: (
              <Suspense fallback={<Loading />}>
                <TabCreate />
              </Suspense>
            ),
          },
          {
            path: 'edit/:id',
            element: (
              <Suspense fallback={<Loading />}>
                <TabEdit />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'banner',
        element: <BannerManagement />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loading />}>
                <BannerList />
              </Suspense>
            ),
          },
          {
            path: 'create',
            element: (
              <Suspense fallback={<Loading />}>
                <BannerCreate />
              </Suspense>
            ),
          },
          {
            path: 'edit/:id',
            element: (
              <Suspense fallback={<Loading />}>
                <BannerEdit />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'tag',
        element: <TagManagement />,
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Loading />}>
                <TagList />
              </Suspense>
            ),
          },
          {
            path: 'edit/:id',
            element: (
              <Suspense fallback={<Loading />}>
                <TagEdit />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <Navigate to="/login" replace />,
  },
]; 