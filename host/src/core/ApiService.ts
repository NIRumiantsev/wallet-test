import axios, { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { serviceContainer } from './ServiceContainer';

class ApiService {
  private _axiosInstance: AxiosInstance;

  constructor() {
    this._axiosInstance = axios.create(this.createAxiosConfig());
    this._axiosInstance.interceptors.response.use(this.handleSuccess, this.handleError);
  }

  private createAxiosConfig(): AxiosRequestConfig {
    return {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  private handleSuccess(response: AxiosResponse) {
    return response;
  }

  private handleError (error: AxiosError) {
    throw error
  }

  async get<T>(url: string, config: AxiosRequestConfig = {}) {
    const response = await this._axiosInstance.get<T>(url, { ...this._axiosInstance.defaults, ...config });
    return response.data;
  }

  async post<T>(url: string, data?: any, config: AxiosRequestConfig = {}) {
    const response = await this._axiosInstance.post<T>(url, data || '', { ...this._axiosInstance.defaults, ...config });
    return response.data;
  }

  async put<T>(url: string, data?: any, config: AxiosRequestConfig = {}) {
    const response = await this._axiosInstance.post<T>(url, data || '', { ...this._axiosInstance.defaults, ...config });
    return response.data;
  }

  async delete<T>(url: string, config: AxiosRequestConfig = {}) {
    const response = await this._axiosInstance.delete<T>(url, { ...this._axiosInstance.defaults, ...config });
    return response.data;
  }
}

export { ApiService };
