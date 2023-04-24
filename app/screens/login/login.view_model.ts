import {useReducer, useRef} from 'react';
import {TextInput} from 'react-native-gesture-handler';

import {useUserLocale} from '@app/context/locale';
import {useTheme} from '@app/context/theme';
import {useMemoizedCallback} from '@app/hooks';

import {homeActions} from './login.actions';
import {reducer, initialState} from './login.reducer';

export const useViewModel = () => {
    const loginRef = useRef<TextInput>(null);
    const {locale, updateLocale} = useUserLocale();
    const {theme, updateTheme} = useTheme();

    const [state, dispatch] = useReducer(reducer, initialState);

    const onLoginChange = useMemoizedCallback(async (text: string) => {
        dispatch(homeActions.setEmail(text));
    }, []);

    const focusLogin = useMemoizedCallback(() => {
        loginRef?.current?.focus();
    }, []);

    return {
        loginRef,
        state,
        theme,
        onLoginChange,
        focusLogin,
        updateLocale,
        updateTheme,
    };
};
