import { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import Login from '@/pages/Login';
import PrivateRoute from '@/components/PrivateRoute';

// 懒加载组件
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const UserList = lazy(() => import('@/pages/User/List'));
const UserForm = lazy(() => import('@/pages/User/Form'));
const TagList = lazy(() => import('@/pages/Tag/List'));
const TagForm = lazy(() => import('@/pages/Tag/Form'));
const FileList = lazy(() => import('@/pages/File/List'));
const FileEditor = lazy(() => import('@/pages/File/Editor'));
const BannerList = lazy(() => import('@/pages/Banner/List'));
const BannerForm = lazy(() => import('@/pages/Banner/Form'));
const System = lazy(() => import('@/pages/System'));

export const routes = [
  {
    path: '/',
    element: <PrivateRoute><MainLayout /></PrivateRoute>,
    children: [
      {
        path: '',
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
            path: '',
            element: <UserList />,
          },
          {
            path: 'create',
            element: <UserForm />,
          },
          {
            path: 'edit/:id',
            element: <UserForm />,
          },
        ],
      },
      {
        path: 'tags',
        children: [
          {
            path: '',
            element: <TagList />,
          },
          {
            path: 'create',
            element: <TagForm />,
          },
          {
            path: 'edit/:id',
            element: <TagForm />,
          },
        ],
      },
      {
        path: 'files',
        children: [
          {
            path: '',
            element: <FileList />,
          },
          {
            path: 'editor',
            element: <FileEditor />,
          },
        ],
      },
      {
        path: 'banners',
        children: [
          {
            path: '',
            element: <BannerList />,
          },
          {
            path: 'create',
            element: <BannerForm />,
          },
          {
            path: 'edit/:id',
            element: <BannerForm />,
          },
        ],
      },
      {
        path: 'system',
        element: <System />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]; 