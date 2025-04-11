export interface LoginFormData {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expiresIn: number; // 过期时间（秒）
  userInfo: {
    id: string;
    username: string;
    role: string;
  };
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  userInfo: LoginResponse['userInfo'] | null;
  expiresAt: number | null;
} 