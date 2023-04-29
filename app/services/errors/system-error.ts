import {MessageBodyModel} from '@app/models/request/message_body';

import {IDefaultMessageType} from './type';

export class SystemError extends Error {
    httpStatus: number;

    backendJson: unknown;

    requestMessage: MessageBodyModel<any> | IDefaultMessageType | undefined;

    constructor(
        httpStatus = -1,
        message = '',
        backendJson: unknown = undefined,
        requestMessage: MessageBodyModel<any> | IDefaultMessageType | undefined = undefined
    ) {
        super(message);

        Object.setPrototypeOf(this, SystemError.prototype);

        this.name = 'SystemError';

        this.message = message;

        this.httpStatus = httpStatus;

        this.backendJson = backendJson;

        this.requestMessage = requestMessage;
    }
}
