import React from 'react';
import { BrowserRouter, Routes, Route, useRoutes } from 'react-router-dom';
import routes from './router';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';

const AppRoutes = () => {
  const element = useRoutes(routes);
  return element;
};

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
