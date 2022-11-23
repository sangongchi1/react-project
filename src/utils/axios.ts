import axios, { AxiosRequestConfig } from 'axios';
import { CancelRequest } from './requestMethod';

// 实例化取消请求对象
let cancelRequest = new CancelRequest();

interface IAxiosRequestConfig extends AxiosRequestConfig {
  requestBase?: string; // 服务类型
  noAccess?: boolean;
}

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
const service = axios.create({
  withCredentials: true,
  timeout: 30000,
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    config.baseURL = 'https://api.btclass.net';
    // 检查之前是否存在相同的请求，如果存在则取消。
    cancelRequest.cancelReq(config);
    // 记录当前请求
    cancelRequest.addCancelReqKey(config, axios.CancelToken);
    console.log('config', config);
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    // 移除成功请求记录
    cancelRequest.removeRequestKey(res.config);
    return res.data;
  },
  (err) => {
    // 移除失败的请求记录
    cancelRequest.removeRequestKey(err.config || {});
    if (axios.isCancel(err)) {
      console.log('重复请求信息：' + err.message);
    }
    return Promise.reject(err);
  }
);

export const request = {
  async get<T = any>(url: string, params?: object, config?: IAxiosRequestConfig) {
    const data = await service.get<T>(url, { params, ...config });
    return data as any as T;
  },
  async post<T = any>(url: string, data?: object, config: IAxiosRequestConfig = {}) {
    const res = await service.post<T>(url, data, config);
    return res as any as T;
  },
  async put<T = any>(url: string, data?: object, config?: IAxiosRequestConfig) {
    const res = await service.put<T>(url, data, config);
    return res as any as T;
  },
  async delete<T = any>(url: string, config?: IAxiosRequestConfig) {
    const res = await service.delete(url, config);
    return res as any as T;
  },
  async patch<T = any>(url: string, data?: object, config?: IAxiosRequestConfig) {
    const res = await service.patch<T>(url, data, config);
    return res as any as T;
  },
  async request<T = any>(config: IAxiosRequestConfig) {
    const res = await service.request<T>(config);
    return res as any as T;
  },
};

export default request;
