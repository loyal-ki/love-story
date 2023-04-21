import {combineReducers} from 'redux';
import {createReducer} from 'typesafe-actions';

import {IPostByIdState} from './post.types';

import {IPostActionType} from '@store/actions/actions.types';
import {postActions} from '@store/actions/post.action';
import {NetworkLoadingStatusTypes} from '@typings/utils/enums';


const isFetchingReducer = createReducer<NetworkLoadingStatusTypes, IPostActionType>(
    NetworkLoadingStatusTypes.Loading
)
    .handleAction(postActions.fetchPostRequest, () => {
        return NetworkLoadingStatusTypes.Loading;
    })
    .handleAction(postActions.fetchPostSuccess, () => {
        return NetworkLoadingStatusTypes.Success;
    })
    .handleAction(postActions.fetchPostFailure, () => {
        return NetworkLoadingStatusTypes.Error;
    });

export const lastUpdatedReducer = createReducer<number, IPostActionType>(-1).handleAction(
    postActions.fetchPostSuccess,
    (_state, action) => {
        return new Date().getTime();
    }
);

export const postByIdState: IPostByIdState = [];

export const postListByIdReducer = createReducer<IPostByIdState, IPostActionType>(
    postByIdState
).handleAction(postActions.fetchPostSuccess, (state, action) => {
    return action.payload.listPost;
});

export const postReducer = combineReducers({
    byId: postListByIdReducer,
    isFetching: isFetchingReducer,
    lastUpdated: lastUpdatedReducer,
});
