import _ from 'lodash';
import {IPostActionType} from '@store/actions/actions.types';
import {ReduxAppState} from '@store/rootReducer';
import {isActionOf} from 'typesafe-actions';
import {Epic, ActionsObservable, StateObservable} from 'redux-observable';
import {of, defer} from 'rxjs';
import {map, switchMap, filter, catchError, retry, tap} from 'rxjs/operators';
import {postActions} from '@store/actions/post.action';
import {delay} from '@app/utils';

const fetchPost = async () => {
    await delay(2000);
    return [
        {
            userId: 1,
            id: 1,
            title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
            body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
        },
        {
            userId: 1,
            id: 2,
            title: 'qui est esse',
            body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
        },
        {
            userId: 1,
            id: 3,
            title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
            body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
        },
        {
            userId: 1,
            id: 4,
            title: 'eum et est occaecati',
            body: 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit',
        },
        {
            userId: 1,
            id: 5,
            title: 'nesciunt quas odio',
            body: 'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque',
        },
    ];
};

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
                new Date().getTime() - postValue.lastUpdated > 10000
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
            return defer(() => fetchPost()).pipe(
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
