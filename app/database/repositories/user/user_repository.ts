import {UserModel} from '@app/models';
import UserDAO from '@database/dao/user';

export const initUser = async (): Promise<void> => {
    return UserDAO.initUser();
};

export const getCurrentUser = async (): Promise<UserModel> => {
    const result = await UserDAO.getCurrentUser();
    return result;
};
