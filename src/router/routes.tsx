import { lazy, Suspense } from 'react';
import { RouteObject, Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import SystemSettings from '@/pages/System/Settings';
import MarkdownEditor from '@/pages/File/MarkdownEditor';
import PrivateRoute from '@/components/PrivateRoute';
import { Spin } from 'antd';

// 使用 lazy 加载的组件
const UserList = lazy(() => import('@/pages/User/List/index'));
const UserForm = lazy(() => import('@/pages/User/Form/index'));
const BannerList = lazy(() => import('@/pages/Banner/List'));
const BannerCreate = lazy(() => import('@/pages/Banner/Create'));
const BannerEdit = lazy(() => import('@/pages/Banner/Edit'));
const TagList = lazy(() => import('@/pages/Tag/List'));
const TagEdit = lazy(() => import('@/pages/Tag/Edit'));

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
        children: [
          {
            index: true,
            element: <Navigate to="list" replace />,
          },
          {
            path: 'list',
            element: (
              <Suspense fallback={<Loading />}>
                <UserList />
              </Suspense>
            ),
          },
          {
            path: 'create',
            element: (
              <Suspense fallback={<Loading />}>
                <UserForm />
              </Suspense>
            ),
          },
          {
            path: ':id/edit',
            element: (
              <Suspense fallback={<Loading />}>
                <UserForm />
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
        path: 'banner',
        element: <Navigate to="/banner/list" replace />,
        children: [
          {
            path: 'list',
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
            path: ':id/edit',
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
        element: <Navigate to="/tag/list" replace />,
        children: [
          {
            path: 'list',
            element: (
              <Suspense fallback={<Loading />}>
                <TagList />
              </Suspense>
            ),
          },
          {
            path: 'create',
            element: (
              <Suspense fallback={<Loading />}>
                <TagEdit />
              </Suspense>
            ),
          },
          {
            path: ':id/edit',
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