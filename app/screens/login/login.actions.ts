import {ActionType, createAction} from 'typesafe-actions';

import {LoginActionsConstance} from './login.types';

const setEmail = createAction(LoginActionsConstance.setEmail, (email: string) => ({
    email,
}))();

export const homeActions = {
    setEmail,
};

export type HomeActionType = ActionType<typeof homeActions>;
