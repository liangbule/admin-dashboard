import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { logger, LogType } from '@/utils/logger';

// 路由守卫
export const onRouteBefore = (path: string) => {
  logger.info(LogType.SYSTEM, '路由跳转', { path });
  
  // 如果是登录页，直接放行
  if (path === '/login') {
    return true;
  }

  // 检查是否已登录
  const token = localStorage.getItem('token');
  if (!token) {
    logger.warn(LogType.AUTH, '未登录，跳转到登录页');
    return '/login';
  }

  return true;
};

const router = createBrowserRouter(routes);

const Router = () => {
  return <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />;
};

export default Router; 