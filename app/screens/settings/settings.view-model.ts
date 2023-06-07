import {useReducer} from 'react';
import {IntlShape} from 'react-intl';

import {useUserLocale} from '@app/context/locale';
import {useTheme} from '@app/context/theme';
import {useMemoizedCallback, useMount} from '@app/hooks';

import {showLanguageOptionsBottomSheet} from './advanced';
import {settingsActions} from './settings.actions';
import {initialState, reducer} from './settings.reducer';

export const useViewModel = (intl: IntlShape) => {
    const {locale, updateLocale} = useUserLocale();
    const {theme, updateTheme} = useTheme();
    const [state, dispatch] = useReducer(reducer, initialState);

    const initViewModel = useMemoizedCallback(() => {
        dispatch(settingsActions.setInit(locale, theme.type === 'dark'));
    }, [locale, theme.type]);

    useMount(initViewModel);

    const useChangeThemeMode = useMemoizedCallback(async () => {
        if (theme.type === 'dark') {
            updateTheme('light');
        } else {
            updateTheme('dark');
        }

        dispatch(settingsActions.setDarkMode(!state.isDarkModeEnable));
    }, [state.isDarkModeEnable, theme.type, updateTheme]);

    const openLanguageBottomSelect = useMemoizedCallback(() => {
        showLanguageOptionsBottomSheet({
            theme,
            title: '',
            intl,
            langSelected: locale,
            onSelectedLanguage(lang) {
                updateLocale(lang);
                dispatch(settingsActions.setLocale(lang));
            },
        });
    }, [intl, locale, theme, updateLocale]);

    return {
        state,
        locale,
        theme,
        updateLocale,
        useChangeThemeMode,
        openLanguageBottomSelect,
        initViewModel,
    };
};
