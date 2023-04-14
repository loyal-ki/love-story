import {createReducer} from 'typesafe-actions';
import type {ICounterActionType} from '@store/actions/actions.types';
import { counterActions } from '@store/actions';

export const initState: ICounterState = {
    count: 0,
};

export const counterReducer = createReducer<ICounterState, ICounterActionType>(
    initState
).handleAction(counterActions.setCounter, (state, {payload: {count}}) => {
    return {
        ...state,
        count: count,
    };
});
