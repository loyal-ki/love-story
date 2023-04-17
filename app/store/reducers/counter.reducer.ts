import {counterActions} from '@store/actions';
import {createReducer} from 'typesafe-actions';

import type {ICounterActionType} from '@store/actions/actions.types';

export const initState: ICounterState = {
    count: 0,
};

export const counterReducer = createReducer<ICounterState, ICounterActionType>(
    initState
).handleAction(counterActions.setCounter, (state, {payload: {count}}) => {
    return {
        ...state,
        count,
    };
});
