import merge from 'deepmerge';

import {SCHEMA_NAME} from '@constants';
import DatabaseHandler from '@database/handler/handler';
import {PreferencesModel} from '@database/models';

// DEFAULT PREFERENCES KEY
const PREFERENCES_ID = 2;

class PreferencesDAO {
    async initPreferences(): Promise<void> {
        const preferences = await DatabaseHandler.getObjectById<PreferencesModel>(
            SCHEMA_NAME.PREFERENCES,
            PREFERENCES_ID
        );

        if (!preferences) {
            await DatabaseHandler.createObject(
                SCHEMA_NAME.PREFERENCES,
                merge(PreferencesModel.default(), {id: PREFERENCES_ID})
            );
        }
    }

    async getTheme(): Promise<Theme | undefined> {
        const preferences = await DatabaseHandler.getObjectById(
            SCHEMA_NAME.PREFERENCES,
            PREFERENCES_ID
        );

        const result = PreferencesModel.instantiate(preferences);
        return result.persistedTheme;
    }

    async setTheme(theme: Theme): Promise<void> {
        await DatabaseHandler.updateDictionaries(
            SCHEMA_NAME.PREFERENCES,
            PREFERENCES_ID,
            ['persistedTheme'],
            [theme]
        );
    }

    async getLocale(): Promise<string | undefined> {
        const preferences = await DatabaseHandler.getObjectById<PreferencesModel>(
            SCHEMA_NAME.PREFERENCES,
            PREFERENCES_ID
        );

        const result = PreferencesModel.instantiate(preferences);
        return result.locale;
    }

    async setLocale(locale: string): Promise<void> {
        await DatabaseHandler.updateFields(
            SCHEMA_NAME.PREFERENCES,
            PREFERENCES_ID,
            ['locale'],
            [locale]
        );
    }
}

export default new PreferencesDAO();
