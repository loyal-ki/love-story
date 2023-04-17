import {AxiosRequestConfig, AxiosHeaders} from 'axios';
import merge from 'deepmerge';
import {EmitterSubscription} from 'react-native/types';

import {RequestMessageModel} from '@app/models/request/request_message';

import {defaultAxiosOptions, initializationAxios} from './axios_setup';
import {APIClientErrorEventHandler, APISenderInterface} from './type';

/* //////////////////////////////////////////////////////////////
                    API SENDER - AXIOS CUSTOM
  ////////////////////////////////////////////////////////////// */
class APISender implements APISenderInterface {
    baseUrl!: string;

    config!: AxiosRequestConfig<any>;

    get<T>(message: RequestMessageModel<unknown>, callback: (response: any) => void): void {
        const {endpoint, body} = message;

        defaultAxiosOptions.baseURL = this.baseUrl;

        const defaultOptions = merge(defaultAxiosOptions, {...body.options});

        const axiosInstance = initializationAxios(defaultOptions).get(endpoint, {
            params: body.queryParams,
        });

        callback(axiosInstance);
    }

    put<T>(message: RequestMessageModel<unknown>, callback: (response: any) => void): void {
        const {endpoint, body} = message;

        defaultAxiosOptions.baseURL = this.baseUrl;

        const defaultOptions = merge(defaultAxiosOptions, {...body.options});

        const axiosInstance = initializationAxios(defaultOptions).post(endpoint, body.data, {
            params: body.queryParams,
        });

        callback(axiosInstance);
    }

    post<T>(message: RequestMessageModel<unknown>, callback: (response: any) => void): void {
        const {endpoint, body} = message;

        defaultAxiosOptions.baseURL = this.baseUrl;

        const defaultOptions = merge(defaultAxiosOptions, {...body.options});

        const axiosInstance = initializationAxios(defaultOptions).post(endpoint, body.data, {
            params: body.queryParams,
        });

        callback(axiosInstance);
    }

    patch<T>(message: RequestMessageModel<unknown>, callback: (response: any) => void): void {
        const {endpoint, body} = message;

        defaultAxiosOptions.baseURL = this.baseUrl;

        const defaultOptions = merge(defaultAxiosOptions, {...body.options});

        const axiosInstance = initializationAxios(defaultOptions).patch(endpoint, body.data, {
            params: body.queryParams,
        });

        callback(axiosInstance);
    }

    delete<T>(message: RequestMessageModel<unknown>, callback: (response: any) => void): void {
        const {endpoint, body} = message;

        defaultAxiosOptions.baseURL = this.baseUrl;

        const defaultOptions = merge(defaultAxiosOptions, {...body.options});

        const axiosInstance = initializationAxios(defaultOptions).delete(endpoint);

        callback(axiosInstance);
    }

    onClientErrorSubscription?: EmitterSubscription | undefined;

    onClientError(callback: APIClientErrorEventHandler): void {
        throw new Error('Method not implemented.');
    }

    getHeaders(): Promise<AxiosHeaders> {
        throw new Error('Method not implemented.');
    }

    addHeaders(headers: AxiosHeaders): Promise<void> {
        throw new Error('Method not implemented.');
    }

    invalidate(): Promise<void> {
        throw new Error('Method not implemented.');
    }
}

export default new APISender();
