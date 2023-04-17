import {safeGet} from '@app/utils';

export class UserModel implements IUser {
    static instantiate = (json: any): UserModel => {
        return new UserModel(
            safeGet(json, 'id', 0),
            safeGet(json, 'email', ''),
            safeGet(json, 'firstName', ''),
            safeGet(json, 'lastName', ''),
            safeGet(json, 'nickname', '')
        );
    };

    static default = (): UserModel => {
        return {
            id: 0,
            email: '',
            firstName: '',
            lastName: '',
            nickname: '',
        };
    };

    id: number | undefined;

    email: string | undefined;

    firstName: string | undefined;

    lastName: string | undefined;

    nickname: string | undefined;

    constructor(
        id: number | undefined,
        email: string | undefined,
        firstName: string | undefined,
        lastName: string | undefined,
        nickname: string | undefined
    ) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.nickname = nickname;
    }
}
