import {UserModel} from '@app/database/models';
import UserDAO from '@database/dao/user';

export const initUser = async (): Promise<void> => {
    return await UserDAO.initUser();
};

export const getCurrentUser = async (): Promise<UserModel> => {
    const result = await UserDAO.getCurrentUser();
    return result;
};
