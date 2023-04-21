import {PostModel} from '@app/models';
import {doFetchArrayData, makeBackendRequestMessage} from '@app/services/clients';

import {BackendMethodService} from '@typings/services/method';

export const fetchPost = async () => {
    const message = makeBackendRequestMessage('/posts', BackendMethodService.get, {});
    const response = await doFetchArrayData(message);
    const result = PostModel.instantiateList(response);
    return result;
};
