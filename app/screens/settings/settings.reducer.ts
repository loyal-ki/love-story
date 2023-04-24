import {createReducer} from 'typesafe-actions';

import {DEFAULT_LOCALE} from '@app/localization';

import {ISettingsState} from './setting.types';
import {SettingsActionType, settingsActions} from './settings.actions';

export const initialState: ISettingsState = {
    isDarkModeEnable: false,
    settingLocale: DEFAULT_LOCALE,
};

export const reducer = createReducer<ISettingsState, SettingsActionType>(initialState)
    .handleAction(settingsActions.setInit, (state, action) => {
        return {
            ...state,
            isDarkModeEnable: action.payload.isDarkModeEnable,
            settingLocale: action.payload.settingLocale,
        };
    })
    .handleAction(settingsActions.setDarkMode, (state, action) => {
        return {
            ...state,
            isDarkModeEnable: action.payload.isDarkModeEnable,
        };
    })
    .handleAction(settingsActions.setLocale, (state, action) => {
        return {
            ...state,
            settingLocale: action.payload.settingLocale,
        };
    });
