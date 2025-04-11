import { post, get, put, del } from '@/utils/request';

interface LoginParams {
  username: string;
  password: string;
}

export interface UserInfo {
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
  },

  // 获取用户列表
  getUsers: (params: { page: number; pageSize: number; keyword?: string }) => {
    return get<{ list: UserInfo[]; total: number }>('/api/users', params);
  },

  // 创建用户
  createUser: (data: { username: string; password: string; roles: string[] }) => {
    return post<UserInfo>('/api/users', data);
  },

  // 更新用户
  updateUser: (id: number, data: { username?: string; password?: string; roles?: string[] }) => {
    return put<UserInfo>(`/api/users/${id}`, data);
  },

  // 删除用户
  deleteUser: (id: number) => {
    return del(`/api/users/${id}`);
  }
};

// 其他模块的接口可以继续在这里添加
// 例如：
// export const systemApi = {
//   getConfig: () => get('/api/system/config'),
//   updateConfig: (data) => post('/api/system/config', data),
// }; 