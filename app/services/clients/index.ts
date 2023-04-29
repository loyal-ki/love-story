/* eslint-disable no-console */
import {AxiosRequestConfig} from 'axios';
import _ from 'lodash';
import moment from 'moment';
import {nanoid} from 'nanoid/non-secure';

import {GeneralError} from '@app/services/errors/general-error';
import {SystemError} from '@app/services/errors/system-error';
import * as directSender from '@app/services/sender/direct-sender';
import * as proxySender from '@app/services/sender/proxy-sender';
import {delay, formatLog, safeGet} from '@app/utils';

import env from '@env';
import {MessageBodyModel} from '@models/request/message_body';
import {RequestMessageModel} from '@models/request/request_message';
import {AppErrorCode} from '@services/errors/type';
import {BackendMethodService} from '@typings/services/method';
import {ClientDatePatterns} from '@typings/utils/enums';

export const makeBackendRequestMessage = <T>(
    endpoint: string,
    requestType: BackendMethodService,
    data: T,
    options: AxiosRequestConfig = {}
): RequestMessageModel<T> => {
    const body: MessageBodyModel<T> = {
        requestType,
        data,
        options,
    };
    return new RequestMessageModel(endpoint, body);
};

export const formatBackendJsonForLogging = (json: unknown): string => {
    const backendStatus = safeGet(json, 'status', false);
    if (!backendStatus) {
        return `\n[Backend] ${formatLog(json)}`;
    }

    const proxyResponse = safeGet(json, 'data', undefined);
    if (_.isNil(proxyResponse)) {
        return `\n[Backend] ${formatLog(json)}`;
    }

    return `[JSON PROXY] ${formatLog(proxyResponse)}`;
};

let requestCounter = 0;

const sendProxyMessage = async (message: RequestMessageModel<unknown>): Promise<unknown> => {
    requestCounter += 1;
    let correlationId = '';
    let color = 0;
    let startTime = 0;

    if (__DEV__ && env.LOG_REQUESTS) {
        startTime = new Date().getTime();
        color = 31 + (requestCounter % 5);
        correlationId = nanoid();
        console.log(
            `\u001b[${color}m${
                env.SEND_DIRECT_MESSAGE ? '[*DIRECT_MESSAGE*]' : ''
            }[REQUEST][${correlationId}][${moment().format(ClientDatePatterns.Log)}]\n ${formatLog(
                message.body
            )}`
        );
    }

    let promise;
    if (__DEV__ && env.SEND_DIRECT_MESSAGE) {
        promise = directSender.sendMessage(message);
    } else {
        promise = proxySender.sendMessage(message);
    }

    const result = await promise;

    if (env.DELAY_NETWORK_RESPONSES) {
        await delay(env.NETWORK_REQUESTS_LATENCY);
    }

    if (__DEV__ && env.LOG_REQUESTS) {
        const executionTime = new Date().getTime() - startTime;
        console.log(
            `\u001b[${color}m${
                env.SEND_DIRECT_MESSAGE ? '[*DIRECT_MESSAGE*]' : ''
            }[RESPONSE][${correlationId}][${moment().format(ClientDatePatterns.Log)}][${
                executionTime / 1000
            }s]\n${formatBackendJsonForLogging(result)}`
        );
    }

    return result;
};

export const parseBackendData = <T>(
    request: RequestMessageModel<unknown>,
    json: unknown
): IResultSealed<T> => {
    const backendStatus = safeGet(json, 'status', false);
    if (backendStatus !== 200) {
        const error = new GeneralError(
            AppErrorCode.BackendMessageStatusFalse,
            '',
            json,
            request.body
        );
        return {data: undefined, error};
    }

    const proxyResponse = safeGet(json, 'data', undefined);

    // TODO: It depends on BackendServices when handling error.
    const errorMessageFromServer = '';

    if (backendStatus >= 500) {
        const error = new SystemError(backendStatus, errorMessageFromServer, json, request.body);
        return {data: undefined, error, message: errorMessageFromServer};
    }

    if (_.isNil(proxyResponse)) {
        const error = new GeneralError(
            AppErrorCode.BackendProxyResponseUndefined,
            '',
            json,
            request.body
        );
        return {data: undefined, error};
    }

    switch (backendStatus) {
        case 200: {
            const data = proxyResponse;
            return {data, error: undefined, message: errorMessageFromServer};
        }
        default: {
            const error = new SystemError(
                backendStatus,
                errorMessageFromServer,
                json,
                request.body
            );
            return {data: undefined, error, message: errorMessageFromServer};
        }
    }
};

export const doFetchData = async <T>(requestMessage: RequestMessageModel<unknown>): Promise<T> => {
    const response = await sendProxyMessage(requestMessage);
    const {data, error} = parseBackendData<T>(requestMessage, response);
    if (error) {
        throw error;
    }
    if (_.isNil(data)) {
        throw new GeneralError(AppErrorCode.BackendRespondsEmptyData);
    }
    return data;
};

export const doFetchArrayData = async <T>(
    requestMessage: RequestMessageModel<unknown>
): Promise<T[]> => {
    const response = await sendProxyMessage(requestMessage);

    const {data, error} = parseBackendData<T[]>(requestMessage, response);

    if (error) {
        throw error;
    }

    if (_.isNil(data) || !_.isArray(data)) {
        throw new GeneralError(AppErrorCode.BackendRespondsEmptyData);
    }

    return data;
};
