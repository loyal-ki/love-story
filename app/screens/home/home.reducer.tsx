import {createReducer} from 'typesafe-actions';

import {HomeActionType, homeActions} from './home.actions';
import {IHomeState} from './home.types';
import {validateEmailContact} from './home.validation';

export const initialState: IHomeState = {
    email: '',
    emailError: undefined,
};

export const reducer = createReducer<IHomeState, HomeActionType>(initialState).handleAction(
    homeActions.setEmail,
    (state, action) => {
        return {
            ...state,
            email: action.payload.email,
            emailError: validateEmailContact(action.payload.email).errorMessage,
        };
    }
);
