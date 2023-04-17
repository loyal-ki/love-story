import {RequestMessageModel} from '@models/request/request_message';
import {GeneralError} from '@services/errors/general_error';
import {AppErrorCode} from '@services/errors/type';
import _ from 'lodash';

import APISender from './base_sender';

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
