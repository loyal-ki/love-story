import _ from 'lodash';

import {GeneralError} from '@app/services/errors/general-error';

import APISender from './base-sender';

import {RequestMessageModel} from '@models/request/request_message';
import {AppErrorCode} from '@services/errors/type';
import {BackendMethodService} from '@typings/services/method';

/// This method is only used for development.
export const sendMessage = async (message: RequestMessageModel<unknown>): Promise<unknown> => {
    APISender.baseUrl = 'https://jsonplaceholder.typicode.com';

    const {body} = message;

    const promise = new Promise((resolve, reject) => {
        switch (body.requestType) {
            case BackendMethodService.get:
                APISender.get(message, response => {
                    if (_.isNil(response)) {
                        const error = new GeneralError(
                            AppErrorCode.BackendSendProxyResponseUndefined
                        );
                        reject(error);
                        return;
                    }
                    resolve(response);
                });
                break;
            case BackendMethodService.put:
                APISender.put(message, response => {
                    if (_.isNil(response)) {
                        const error = new GeneralError(
                            AppErrorCode.BackendSendProxyResponseUndefined
                        );
                        reject(error);
                        return;
                    }
                    resolve(response);
                });
                break;
            case BackendMethodService.post:
                APISender.post(message, response => {
                    if (_.isNil(response)) {
                        const error = new GeneralError(
                            AppErrorCode.BackendSendProxyResponseUndefined
                        );
                        reject(error);
                        return;
                    }
                    resolve(response);
                });
                break;
            case BackendMethodService.delete:
                APISender.delete(message, response => {
                    if (_.isNil(response)) {
                        const error = new GeneralError(
                            AppErrorCode.BackendSendProxyResponseUndefined
                        );
                        reject(error);
                        return;
                    }
                    resolve(response);
                });
                break;
            case BackendMethodService.patch:
                APISender.patch(message, response => {
                    if (_.isNil(response)) {
                        const error = new GeneralError(
                            AppErrorCode.BackendSendProxyResponseUndefined
                        );
                        reject(error);
                        return;
                    }
                    resolve(response);
                });
                break;
            default:
                break;
        }
    });

    return promise;
};
