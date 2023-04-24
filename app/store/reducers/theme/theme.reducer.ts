import {createReducer} from 'typesafe-actions';

import {Themes} from '@app/constants/themes';
import {themeActions} from '@app/store/actions/theme/theme.action';

import {IThemeActionType} from '@store/actions/actions.types';

export const initState: IThemeState = {
    theme: Themes.dark,
};

export const themeReducer = createReducer<IThemeState, IThemeActionType>(initState)
    .handleAction(themeActions.fetchThemeFromDbRequest, (state, _) => {
        return {
            ...state,
        };
    })
    .handleAction(themeActions.fetchThemeFromDbSuccess, (state, {payload: {theme}}) => {
        return {
            ...state,
            theme,
        };
    })
    .handleAction(themeActions.setThemeToDbRequest, (state, {payload: {theme}}) => {
        return {
            ...state,
            theme,
        };
    });
