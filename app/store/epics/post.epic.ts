import {IPostActionType} from '@store/actions/actions.types';
import {postActions} from '@store/actions/post.action';
import {ReduxAppState} from '@store/rootReducer';
import _ from 'lodash';
import {Epic, ActionsObservable, StateObservable} from 'redux-observable';
import {of, defer} from 'rxjs';
import {map, switchMap, filter, catchError, retry, tap} from 'rxjs/operators';
import {isActionOf} from 'typesafe-actions';

import {APIServiceManager} from '@app/services/apis';

const requestPostIfNeededEpic: Epic<IPostActionType, IPostActionType, ReduxAppState> = (
    action$: ActionsObservable<IPostActionType>,
    state$: StateObservable<ReduxAppState>
) => {
    return action$.pipe(
        filter(isActionOf(postActions.fetchPostIfNeeded)),
        filter(action => {
            const postValue = state$.value.post;

            return (
                _.isNil(postValue.byId) ||
                postValue.lastUpdated === -1 ||
                new Date().getTime() - postValue.lastUpdated > 60000
            );
        }),
        map(action => postActions.fetchPostRequest(action.meta))
    );
};

const requestPostEpic: Epic<IPostActionType, IPostActionType, ReduxAppState> = (
    action$: ActionsObservable<IPostActionType>
) => {
    return action$.pipe(
        filter(isActionOf(postActions.fetchPostRequest)),
        tap(action => {
            action.meta?.onStart?.();
        }),
        switchMap(action => {
            return defer(() => APIServiceManager.postAPIManager().fetchPost()).pipe(
                retry(1),
                map(data => postActions.fetchPostSuccess(data)),
                tap(
                    data => {
                        action.meta?.onComplete?.(data.payload.listPost);
                    },
                    (error: unknown) => {
                        action.meta?.onError?.(error);
                    }
                ),
                catchError((error: unknown) => {
                    return of(postActions.fetchPostFailure(error));
                })
            );
        })
    );
};

export default [requestPostIfNeededEpic, requestPostEpic];
