import {ActionType, createAction} from 'typesafe-actions';

import {SettingsActionsConstance} from './setting.types';

const setInit = createAction(
    SettingsActionsConstance.setInit,
    (settingLocale: string, isDarkModeEnable: boolean) => ({
        settingLocale,
        isDarkModeEnable,
    })
)();

const setLocale = createAction(SettingsActionsConstance.setLocale, (settingLocale: string) => ({
    settingLocale,
}))();

const setDarkMode = createAction(
    SettingsActionsConstance.setDarkMode,
    (isDarkModeEnable: boolean) => ({
        isDarkModeEnable,
    })
)();

export const settingsActions = {
    setInit,
    setLocale,
    setDarkMode,
};

export type SettingsActionType = ActionType<typeof settingsActions>;
