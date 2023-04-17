import {MessageBodyModel} from '@app/models/request/message_body';

export class GeneralError extends Error {
    status: number;

    backendJson: unknown;

    requestMessage: MessageBodyModel<any> | undefined;

    constructor(
        status = 0,
        message = '',
        backendJson: unknown = undefined,
        requestMessage: MessageBodyModel<any> | undefined = undefined
    ) {
        super(message);

        Object.setPrototypeOf(this, GeneralError.prototype);

        this.name = 'GeneralError';

        this.message = message;

        this.status = status;

        this.backendJson = backendJson;

        this.requestMessage = requestMessage;
    }
}
