import {useReducer, useRef} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';

import {useMemoizedCallback, useMount} from '@app/hooks';
import {PostModel} from '@app/models';
import {postActions} from '@app/store/actions/post.action';
import {postListSelector, isPostFetchingSelector} from '@app/store/selectors/post.selector';
import {logDebug} from '@app/utils';

import {homeActions} from './home.actions';
import {reducer, initialState} from './home.reducer';

import {DatabaseLocal} from '@database';

export const useViewModel = () => {
    const loginRef = useRef<TextInput>(null);

    const [state, dispatch] = useReducer(reducer, initialState);

    const reduxDispatch = useDispatch();

    const postList = useSelector(postListSelector);
    const isFetch = useSelector(isPostFetchingSelector);

    const init = useMemoizedCallback(() => {
        reduxDispatch(
            postActions.fetchPostIfNeeded({
                onStart: () => {},
                onComplete: (data?: PostModel[]) => {},
                onError: (error: unknown) => {},
            })
        );
    }, [reduxDispatch]);

    useMount(init);

    const onLoginChange = useMemoizedCallback(async (text: string) => {
        dispatch(homeActions.setEmail(text));
    }, []);

    const focusLogin = useMemoizedCallback(() => {
        loginRef?.current?.focus();
    }, []);

    return {
        loginRef,
        isFetch,
        postList,
        state,
        reduxDispatch,
        onLoginChange,
        focusLogin,
    };
};
