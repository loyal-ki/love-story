import _ from 'lodash';

import {GeneralError} from '@app/services/errors/general-error';

import APISender from './base-sender';

import {RequestMessageModel} from '@models/request/request_message';
import {AppErrorCode} from '@services/errors/type';

export const sendMessage = async (message: RequestMessageModel<unknown>): Promise<unknown> => {
    APISender.baseUrl = 'https://jsonplaceholder.typicode.com';

    const promise = new Promise((resolve, reject) => {
        APISender.get(message, response => {
            if (_.isNil(response)) {
                const error = new GeneralError(AppErrorCode.BackendSendProxyResponseUndefined);
                reject(error);
                return;
            }
            resolve(response);
        });
    });

    return promise;
};
