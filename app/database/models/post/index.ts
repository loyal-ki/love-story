import {safeGet} from '@app/utils';

export class PostModel {
    static instantiate = (json: unknown): PostModel => {
        return new PostModel(
            safeGet(json, 'userId', 0),
            safeGet(json, 'id', 0),
            safeGet(json, 'title', ''),
            safeGet(json, 'body', '')
        );
    };

    userId?: number;

    id?: number;

    title?: string;

    body?: string;

    constructor(userId: number, id: number, title: string, body: string) {
        this.userId = userId;
        this.id = id;
        this.title = title;
        this.body = body;
    }
}
