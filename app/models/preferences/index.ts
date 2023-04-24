import { Themes } from '@app/constants/themes';
import {DEFAULT_LOCALE} from '@app/localization';
import {safeGet} from '@app/utils';

export class PreferencesModel implements IPreferences {
    static instantiate = (json: any): PreferencesModel => {
        return new PreferencesModel(
            safeGet(json, 'id', 0),
            safeGet(json, 'locale', ''),
            safeGet(json, 'persistedTheme', {}),
            safeGet(json, 'isFirstInstall', false)
        );
    };

    id: number | undefined;

    locale: string | undefined;

    persistedTheme: Theme | undefined;

    isFirstInstall: boolean;

    static default = (): PreferencesModel => {
        return {
            id: 0,
            locale: DEFAULT_LOCALE,
            persistedTheme: Themes.light,
            isFirstInstall: false,
        };
    };

    constructor(
        id: number | undefined,
        locale: string | undefined,
        persistedTheme: Theme | undefined,
        isFirstInstall: boolean
    ) {
        this.id = id;
        this.locale = locale;
        this.persistedTheme = persistedTheme;
        this.isFirstInstall = isFirstInstall;
    }
}
