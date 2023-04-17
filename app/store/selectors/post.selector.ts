import {ReduxAppState} from '@store/rootReducer';
import {NetworkLoadingStatusTypes} from '@typings/utils/enums';

import {PostModel} from '@app/database/models';

export const postListSelector = (globalState: ReduxAppState): PostModel[] => {
    const result = globalState.post.byId;
    return result;
};

export const isPostFetchingSelector = (globalState: ReduxAppState): NetworkLoadingStatusTypes => {
    const fetching = globalState.post.isFetching;

    return fetching;
};
