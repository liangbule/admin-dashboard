interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  id: string;
  username: string;
  token: string;
}

// 模拟登录 API 请求
export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  // 这里应该是实际的 API 调用
  // 为了演示，我们使用模拟数据
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        resolve({
          id: '1',
          username: credentials.username,
          token: 'mock-jwt-token',
        });
      } else {
        reject(new Error('用户名或密码错误'));
      }
    }, 1000);
  });
}; 