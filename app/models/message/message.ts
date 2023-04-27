import {safeGet} from '@app/utils';

export class MessageModel {
    static instantiate = (json: unknown): MessageModel => {
        return new MessageModel(
            safeGet(json, 'id', 0),
            safeGet(json, 'text', ''),
            safeGet(json, 'sent', false),
            safeGet(json, 'received', false),
            safeGet(json, 'createdAt', 0)
        );
    };

    id: number | undefined;

    text: string;

    sent?: boolean;

    received?: boolean;

    createdAt: Date | number;

    constructor(
        id: number | undefined,
        text: string,
        sent: boolean | undefined,
        received: boolean | undefined,
        createdAt: Date | number
    ) {
        this.id = id;
        this.text = text;
        this.sent = sent;
        this.received = received;
        this.createdAt = createdAt;
    }
}
