import axios, {AxiosRequestConfig, AxiosInstance, ParamsSerializerOptions} from 'axios';

export const initializationAxios = (config?: AxiosRequestConfig): AxiosInstance => {
    const axiosInstance = axios.create(config);
    return axiosInstance;
};

export const defaultAxiosOptions: AxiosRequestConfig = {
    timeout: 30000,
    withCredentials: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    maxContentLength: 2000,
    maxBodyLength: 2000,
    validateStatus: (status: number) => status >= 200 && status < 300,
    paramsSerializer: {
        indexes: true,
        encode: (value: any) => value,
        serialize: (value: Record<string, any>, options?: ParamsSerializerOptions) => String(value),
    },
    maxRedirects: 5,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
    },
};
