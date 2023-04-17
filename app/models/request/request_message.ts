import {MessageBodyModel} from './message_body';

export class RequestMessageModel<T> {
    endpoint: string;

    body: MessageBodyModel<T>;

    constructor(endpoint: string, body: MessageBodyModel<T>) {
        this.endpoint = endpoint;
        this.body = body;
    }
}
