import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { DEFAULT_TIMEOUT_MS } from './constants';

export class HttpClient {
  readonly instance: AxiosInstance;

  constructor(timeout: number = DEFAULT_TIMEOUT_MS) {
    this.instance = axios.create({ timeout });

    this.initializeResponseInterceptor();
  }

  private initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(this.handleResponse, this.handleError);
  };

  private handleResponse = ({ data }: AxiosResponse) => data;
  private handleError = (error: Error | AxiosError) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const code = error.code;

      if (!status) {
        return Promise.reject();
      }
      if (status >= 400 && status < 500) {
        return Promise.reject();
      }
      if (status > 500) {
        return Promise.reject();
      }
      if (code === 'ECONNABORTED') {
        return Promise.reject();
      }
    }
    return Promise.reject(error);
  };
}

const createHttpClient = (timeout: number = DEFAULT_TIMEOUT_MS) => {
  return new HttpClient(timeout);
};

export default createHttpClient;
