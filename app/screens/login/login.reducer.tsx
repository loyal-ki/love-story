import {createReducer} from 'typesafe-actions';

import {HomeActionType, homeActions} from './login.actions';
import {IHomeState} from './login.types';
import {validateEmailContact} from './login.validation';

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
            emailError: validateEmailContact(action.payload.email)
                .errorMessage,
        };
    }
);
