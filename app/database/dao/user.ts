import merge from 'deepmerge';

import {SCHEMA_NAME} from '@app/constants';
import DatabaseHandler from '@database/handler/handler';
import {UserModel} from '@database/models';

// DEFAULT USER KEY
const USER_ID = 1;

class UserDAO {
    async initUser(): Promise<void> {
        const preferences = await DatabaseHandler.getObjectById(SCHEMA_NAME.USER, USER_ID);

        if (!preferences) {
            await DatabaseHandler.createObject(
                SCHEMA_NAME.USER,
                merge(UserModel.default(), {id: USER_ID})
            );
        }
    }

    async getCurrentUser(): Promise<UserModel> {
        const user = await DatabaseHandler.getObjectById(SCHEMA_NAME.USER, USER_ID);
        return UserModel.instantiate(user);
    }
}

export default new UserDAO();
