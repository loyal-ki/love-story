import {ActionType, createAction} from 'typesafe-actions';

import {HomeActionsConstance} from './home.types';

const setEmail = createAction(HomeActionsConstance.setEmail, (email: string) => ({
    email,
}))();

export const homeActions = {
    setEmail,
};

export type HomeActionType = ActionType<typeof homeActions>;
