import {PostModel} from '@app/models';

import {ReduxAppState} from '@store/rootReducer';
import {NetworkLoadingStatusTypes} from '@typings/utils/enums';

export const postListSelector = (globalState: ReduxAppState): PostModel[] => {
    const result = globalState.post.byId;
    return result;
};

export const isPostFetchingSelector = (globalState: ReduxAppState): NetworkLoadingStatusTypes => {
    const fetching = globalState.post.isFetching;
    return fetching;
};
