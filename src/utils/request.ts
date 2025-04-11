import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { message } from 'antd';
import { getToken } from './auth';

// 创建axios实例
const request = axios.create({
  baseURL: '/api', // 使用相对路径，通过代理转发
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response;
    return data;
  },
  (error: AxiosError) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 未授权，跳转到登录页
          window.location.href = '/login';
          break;
        case 403:
          message.error('没有权限访问');
          break;
        case 404:
          message.error('请求的资源不存在');
          break;
        case 500:
          message.error('服务器错误');
          break;
        default:
          message.error('请求失败');
      }
    } else {
      message.error('网络错误，请检查网络连接');
    }
    return Promise.reject(error);
  }
);

// 封装GET请求
export const get = <T>(url: string, params?: object): Promise<T> => {
  return request.get(url, { params });
};

// 封装POST请求
export const post = <T>(url: string, data?: object): Promise<T> => {
  return request.post(url, data);
};

// 封装PUT请求
export const put = <T>(url: string, data?: object): Promise<T> => {
  return request.put(url, data);
};

// 封装DELETE请求
export const del = <T>(url: string, params?: object): Promise<T> => {
  return request.delete(url, { params });
};

export default request; 