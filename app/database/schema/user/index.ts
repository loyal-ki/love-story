import {SCHEMA_NAME} from '@app/constants';
import {UserModel} from '@database/models';

export class UserSchema {
    static schema = {
        name: SCHEMA_NAME.USER,
        primaryKey: 'id',
        properties: {
            id: 'int',
            firstName: 'string',
            lastName: 'string',
            email: 'string',
            nickname: 'string',
        },
    };
}
