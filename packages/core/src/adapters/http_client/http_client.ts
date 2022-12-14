import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import ClientError from '../../infrastructure/errors/client_error';
import ServerError from '../../infrastructure/errors/server_error';
import TimeoutError from '../../infrastructure/errors/timeout_error';
import { ErrorMeta } from '../../infrastructure/errors/error_meta';
import { DEFAULT_TIMEOUT_MS } from './constants';

export default function createHttpClient(timeout: number = DEFAULT_TIMEOUT_MS) {
  return new HttpClient(timeout);
}

export interface IHttpClient {
  getTimeout(): number | undefined;
  request(request: AxiosRequestConfig): Promise<AxiosResponse<any, any>>;
  get(url: string, config: AxiosRequestConfig): Promise<AxiosResponse<any, any>>;
  post<D = any>(url: string, data: D, request: AxiosRequestConfig): Promise<AxiosResponse<any, any>>;
  patch<D = any>(url: string, data: D, request: AxiosRequestConfig): Promise<AxiosResponse<any, any>>;
  put<D = any>(url: string, data: D, request: AxiosRequestConfig): Promise<AxiosResponse<any, any>>;
  delete(url: string, config: AxiosRequestConfig): Promise<AxiosResponse<any, any>>;
}

class HttpClient implements IHttpClient {
  private instance: AxiosInstance;

  constructor(timeout: number = DEFAULT_TIMEOUT_MS) {
    this.instance = axios.create({ timeout });

    this.initializeResponseInterceptor();
  }

  public getTimeout = () => {
    return this.instance.defaults.timeout;
  };

  public request = async (requestConfig: AxiosRequestConfig) => {
    return await this.instance.request(requestConfig);
  };

  public get = async (url: string, config: AxiosRequestConfig | undefined) => {
    return await this.instance.get(url, config);
  };

  public post = async <D = any>(url: string, data: D, config: AxiosRequestConfig | undefined) => {
    return await this.instance.post(url, data, config);
  };

  public patch = async <D = any>(url: string, data: D, config: AxiosRequestConfig | undefined) => {
    return await this.instance.patch(url, data, config);
  };

  public put = async <D = any>(url: string, data: D, config: AxiosRequestConfig | undefined) => {
    return await this.instance.put(url, data, config);
  };

  public delete = async (url: string, config: AxiosRequestConfig | undefined) => {
    return await this.instance.delete(url, config);
  };

  private initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(this.handleResponse, this.handleError);
  };

  private handleResponse = ({ data }: AxiosResponse) => data;
  private handleError = (error: Error | AxiosError) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const code = error.code;

      const meta = buildErrorMeta(error);

      if (status && status >= 400 && status < 500) {
        return Promise.reject(new ClientError(error.message, status, meta));
      }
      if (status && status >= 500) {
        return Promise.reject(new ServerError(error.message, status, meta));
      }
      if (code === 'ECONNABORTED') {
        return Promise.reject(new TimeoutError(error.message, meta));
      }
    }
    return Promise.reject(error);
  };
}

const buildErrorMeta = (error: AxiosError) => {
  const errorMeta: ErrorMeta = {};

  if (error.cause) errorMeta.cause = error.cause;
  if (error.stack) errorMeta.stack = error.stack;
  if (error.code) errorMeta.code = error.code;

  return errorMeta;
};
