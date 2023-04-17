import {SCHEMA_NAME} from '@app/constants';

import {UserSchema, PreferencesSchema} from './schema';

export const COMBINE_SCHEMA: {[key: string]: any} = {
    [SCHEMA_NAME.USER]: UserSchema.schema,
    [SCHEMA_NAME.PREFERENCES]: PreferencesSchema.schema,
};
