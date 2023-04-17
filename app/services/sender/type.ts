import {RequestMessageModel} from '@models/request/request_message';
import {AxiosHeaders, AxiosRequestConfig} from 'axios';
import {EmitterSubscription} from 'react-native';

export const sessionDefaultConfiguration = {
    allowsCellularAccess: true,
    waitsForConnectivity: false,
    timeoutIntervalForRequest: 30,
    timeoutIntervalForResource: 30,
    httpMaximumConnectionsPerHost: 10,
    cancelRequestsOnUnauthorized: false,
};

export type ClientResponse = {
    headers?: AxiosHeaders;
    data?: Record<string, unknown>;
    code: number;
    redirectUrls?: string[];
    ok: boolean;
    retriesExhausted?: boolean;
    path?: string;
};

export type APIClientErrorEvent = {
    serverUrl: string;
    errorCode: number;
    errorDescription: string;
};

export type APIClientErrorEventHandler = (event: APIClientErrorEvent) => void;

export interface APISenderInterface {
    baseUrl: string;

    config: AxiosRequestConfig;

    onClientErrorSubscription?: EmitterSubscription;

    onClientError(callback: APIClientErrorEventHandler): void;

    get<T>(message: RequestMessageModel<unknown>, callback: (response: any) => void): void;

    put<T>(message: RequestMessageModel<unknown>, callback: (response: any) => void): void;

    post<T>(message: RequestMessageModel<unknown>, callback: (response: any) => void): void;

    patch<T>(message: RequestMessageModel<unknown>, callback: (response: any) => void): void;

    delete<T>(message: RequestMessageModel<unknown>, callback: (response: any) => void): void;

    getHeaders(): Promise<AxiosHeaders>;

    addHeaders(headers: AxiosHeaders): Promise<void>;

    invalidate(): Promise<void>;
}
