// src/api.js

import axios from 'axios';

// 创建一个 axios 实例，并配置基本的请求设置
const api = axios.create({
  baseURL: 'http://localhost:8080', // 后端 API 的基本 URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器（可选）
api.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么，比如添加 token
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 响应拦截器（可选）
api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // 处理响应错误
    return Promise.reject(error);
  }
);

export default api;
