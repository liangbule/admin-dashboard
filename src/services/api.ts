import { post } from '@/utils/request';

interface LoginParams {
  username: string;
  password: string;
}

interface UserInfo {
  id: number;
  username: string;
  roles: string[];
}

interface LoginResponse {
  access_token: string;
  user: UserInfo;
}

// 用户相关接口
export const userApi = {
  // 登录
  login: (data: LoginParams) => {
    return post<LoginResponse>('/api/auth/login', data);
  },
  
  // 获取用户信息
  getUserInfo: () => {
    return post<UserInfo>('/api/auth/userInfo');
  },
  
  // 退出登录
  logout: () => {
    return post('/api/auth/logout');
  }
};

// 其他模块的接口可以继续在这里添加
// 例如：
// export const systemApi = {
//   getConfig: () => get('/api/system/config'),
//   updateConfig: (data) => post('/api/system/config', data),
// }; 