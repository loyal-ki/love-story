import {createAction} from 'typesafe-actions';

import {PostModel} from '@app/models';

import {AsyncActionListener} from '@typings/utils/general';
import {UIUtils} from '@utils';

const fetchPostIfNeeded = createAction(
    'post/fetchPostIfNeeded',
    (_listeners?: AsyncActionListener<PostModel[]>) => ({}),
    (listeners?: AsyncActionListener<PostModel[]>) => listeners
)();

const fetchPostRequest = createAction(
    'post/fetchPostRequest',
    (_listeners?: AsyncActionListener<PostModel[]>) => ({}),
    (listeners?: AsyncActionListener<PostModel[]>) => listeners
)();

const fetchPostSuccess = createAction('post/fetchPostSuccess', (listPost: PostModel[]) => {
    return {listPost};
})();

const fetchPostFailure = createAction('post/fetchPostFailure', (error: unknown) => {
    return {errorMessage: UIUtils.extractMessageFromError(error)};
})();

const resetAction = createAction('post/reset')();

export const postActions = {
    fetchPostIfNeeded,
    fetchPostRequest,
    fetchPostSuccess,
    fetchPostFailure,
    resetAction,
};
