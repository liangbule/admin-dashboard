import React from 'react';
import { Navigate, useLocation, createBrowserRouter, RouteObject } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import MainLayout from '@/layouts/MainLayout/MainLayout';
import AuthLayout from '@/layouts/AuthLayout/AuthLayout';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import UserList from '@/pages/User/List';
import UserForm from '@/pages/User/Form';
import TagList from '@/pages/Tag/List';
import TagForm from '@/pages/Tag/Form';
import FileList from '@/pages/File/List';
import BannerList from '@/pages/Banner/List';
import BannerForm from '@/pages/Banner/Form';
import System from '@/pages/System';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation();
  const token = useAppSelector((state) => state.auth.token) || localStorage.getItem('admin_token');
  const isLocalDebug = import.meta.env.VITE_APP_LOCAL_DEBUG === 'true';

  if (isLocalDebug) {
    return <>{children}</>;
  }

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

// 定义应用的路由配置
const appRoutes: RouteObject[] = [
  {
    path: '/login',
    element: (
      <AuthLayout>
        <Login />
      </AuthLayout>
    ),
  },
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
            element: <UserList />,
          },
          {
            path: 'create',
            element: <UserForm />,
          },
          {
            path: ':id/edit',
            element: <UserForm />,
          },
        ],
      },
      {
        path: 'tag',
        children: [
          {
            index: true,
            element: <TagList />,
          },
          {
            path: 'create',
            element: <TagForm />,
          },
          {
            path: ':id/edit',
            element: <TagForm />,
          },
        ],
      },
      {
        path: 'banner',
        children: [
          {
            index: true,
            element: <BannerList />,
          },
          {
            path: 'create',
            element: <BannerForm />,
          },
          {
            path: ':id/edit',
            element: <BannerForm />,
          },
        ],
      },
      {
        path: 'file',
        children: [
          {
            index: true,
            element: <FileList />,
          },
        ],
      },
      {
        path: 'system',
        element: <System />,
      },
    ],
  },
];

export const router = createBrowserRouter(appRoutes); 