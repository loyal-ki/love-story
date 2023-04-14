import {SCHEMA_NAME} from '@app/constants';
import {PreferencesModel} from '@database/models';

export class PreferencesSchema {
    static schema = {
        name: SCHEMA_NAME.PREFERENCES,
        primaryKey: 'id',
        properties: {
            id: 'int',
            locale: 'string',
            persistedTheme: '{}',
            isFirstInstall: {type: 'bool', default: true},
        },
    };
}
