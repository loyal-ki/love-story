export const SET_DARK_MODE = 'SettingsActionsConstance/SetDarkMode';
export const SET_LOCALE = 'SettingsActionsConstance/SetLocale';
export const SET_INIT = 'SettingsActionsConstance/SetInit';

export const SettingsActionsConstance = {
    setLocale: SET_LOCALE,
    setDarkMode: SET_DARK_MODE,
    setInit: SET_INIT,
};

export interface ISettingsState {
    settingLocale: string;
    isDarkModeEnable: boolean;
}
