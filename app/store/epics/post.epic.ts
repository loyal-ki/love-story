import _ from 'lodash';
import {Epic, ActionsObservable, StateObservable} from 'redux-observable';
import {of, defer, merge, timer} from 'rxjs';
import {
    map,
    switchMap,
    filter,
    catchError,
    retry,
    tap,
    mergeMap,
    takeUntil,
    share,
} from 'rxjs/operators';
import {isActionOf} from 'typesafe-actions';

import {APIServiceManager} from '@app/services/apis';

import {IPostActionType} from '@store/actions/actions.types';
import {postActions} from '@store/actions/post.action';
import {ReduxAppState} from '@store/rootReducer';

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
    const cancelRequestPost$ = merge(
        action$.pipe(filter(isActionOf(postActions.fetchPostRequest))),
        action$.pipe(filter(isActionOf(postActions.resetAction)))
    );

    const requestPostAction$ = action$.pipe(
        filter(isActionOf(postActions.fetchPostRequest)),
        tap(action => {
            action.meta?.onStart?.();
        }),
        share()
    );

    const handleQuery$ = requestPostAction$.pipe(
        switchMap(action => {
            return timer(800)
                .pipe(takeUntil(cancelRequestPost$))
                .pipe(
                    mergeMap(() => {
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
                    }),
                    takeUntil(cancelRequestPost$)
                );
        })
    );

    return handleQuery$;
};

export default [requestPostIfNeededEpic, requestPostEpic];
