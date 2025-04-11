import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import UserList from '@/pages/User/List';
import UserForm from '@/pages/User/Form';
import BannerList from '@/pages/Banner/List';
import BannerForm from '@/pages/Banner/Form';
import TabList from '@/pages/Tab/List';
import TabForm from '@/pages/Tab/Form';
import TagList from '@/pages/Tag/List';
import TagForm from '@/pages/Tag/Form';
import FileList from '@/pages/File/List';
import System from '@/pages/System';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation();
  const token = useAppSelector((state) => state.auth.token) || localStorage.getItem('admin_token');

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

const routes = [
  {
    path: '/',
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
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
            path: ':id/edit',
            element: <UserForm />,
          },
        ],
      },
      {
        path: 'banner',
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
            path: ':id/edit',
            element: <BannerForm />,
          },
        ],
      },
      {
        path: 'tab',
        children: [
          {
            path: '',
            element: <TabList />,
          },
          {
            path: 'create',
            element: <TabForm />,
          },
          {
            path: ':id/edit',
            element: <TabForm />,
          },
        ],
      },
      {
        path: 'tag',
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
            path: ':id/edit',
            element: <TagForm />,
          },
        ],
      },
      {
        path: 'file',
        children: [
          {
            path: '',
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
  {
    path: '/login',
    element: <AuthLayout />,
    children: [
      {
        path: '',
        element: <Login />,
      },
    ],
  },
];

export default routes; 