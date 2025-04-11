import { LoginFormData, LoginResponse } from '@/types/auth';

const TOKEN_KEY = 'auth_token';
const USER_INFO_KEY = 'user_info';
const EXPIRES_AT_KEY = 'expires_at';

export const login = async (data: LoginFormData): Promise<LoginResponse> => {
  try {
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 模拟登录验证
    if (data.username === 'admin' && data.password === '123456') {
      const response: LoginResponse = {
        token: 'mock_token_' + Date.now(),
        expiresIn: 1800, // 30分钟
        userInfo: {
          id: '1',
          username: data.username,
          role: 'admin'
        }
      };
      
      // 保存token和用户信息
      localStorage.setItem(TOKEN_KEY, response.token);
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(response.userInfo));
      
      // 计算过期时间
      const expiresAt = Date.now() + response.expiresIn * 1000;
      localStorage.setItem(EXPIRES_AT_KEY, expiresAt.toString());
      
      return response;
    } else {
      // 提供更详细的错误信息
      if (data.username !== 'admin') {
        throw new Error('用户名错误，请使用 admin 登录');
      } else if (data.password !== '123456') {
        throw new Error('密码错误，请使用 123456 登录');
      } else {
        throw new Error('登录失败，请检查用户名和密码');
      }
    }
  } catch (error) {
    console.error('登录失败:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_INFO_KEY);
  localStorage.removeItem(EXPIRES_AT_KEY);
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getUserInfo = () => {
  const userInfo = localStorage.getItem(USER_INFO_KEY);
  return userInfo ? JSON.parse(userInfo) : null;
};

export const isAuthenticated = (): boolean => {
  const token = getToken();
  const expiresAt = localStorage.getItem(EXPIRES_AT_KEY);
  
  if (!token || !expiresAt) {
    return false;
  }
  
  // 检查token是否过期
  return Date.now() < parseInt(expiresAt);
}; 