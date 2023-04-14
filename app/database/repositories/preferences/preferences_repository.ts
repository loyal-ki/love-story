import { logInfo } from '@app/utils';
import PreferencesDAO from '@database/dao/preferences';

export const initPreferences = async (): Promise<void> => {
    await PreferencesDAO.initPreferences();
};

export const getLocale = async (): Promise<string | undefined> => {
    return await PreferencesDAO.getLocale();
};

export const setLocale = async (locale: string): Promise<void> => {
    await PreferencesDAO.setLocale(locale);
};

export const getTheme = async (): Promise<Theme | undefined> => {
    return await PreferencesDAO.getTheme();
};

export const setTheme = async (theme: Theme): Promise<void> => {
    await PreferencesDAO.setTheme(theme);
};
