import { Outlet } from 'react-router-dom';

const BannerManagement = () => {
  return <Outlet />;
};

export default BannerManagement;

export { default as BannerList } from './List';
export { default as BannerForm } from './Form'; 