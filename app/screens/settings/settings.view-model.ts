import {useReducer} from 'react';
import {useIntl} from 'react-intl';

import {useUserLocale} from '@app/context/locale';
import {useTheme} from '@app/context/theme';
import {useMemoizedCallback, useMount} from '@app/hooks';

import {showLanguageOptionsBottomSheet} from './advanced';
import {settingsActions} from './settings.actions';
import {initialState, reducer} from './settings.reducer';

export const useViewModel = () => {
    const intl = useIntl();
    const {locale, updateLocale} = useUserLocale();
    const {theme, updateTheme} = useTheme();
    const [state, dispatch] = useReducer(reducer, initialState);

    useMount(() => {
        dispatch(settingsActions.setInit(locale, theme.type === 'dark'));
    });

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
        intl,
        useChangeThemeMode,
        openLanguageBottomSelect,
    };
};
