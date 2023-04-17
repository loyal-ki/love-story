import {BackendMethodService} from '@typings/services/method';
import {AxiosRequestConfig} from 'axios';

export class MessageBodyModel<T> {
    requestType: BackendMethodService;

    data?: T;

    queryParams?: any;

    options?: AxiosRequestConfig;

    constructor(
        requestType: BackendMethodService,
        data?: T,
        queryParams?: any,
        options?: AxiosRequestConfig
    ) {
        this.requestType = requestType;
        this.queryParams = queryParams;
        this.options = options;
        this.data = data;
    }
}
