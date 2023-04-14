import Realm from 'realm';
import {PreferencesSchema, UserSchema} from '@database/schema';

class AppDatabaseManager {
    private connection: Realm | undefined;

    async databaseConnection(): Promise<Realm> {
        if (!this.connection) {
            this.connection = await Realm.open({
                schema: [UserSchema.schema, PreferencesSchema.schema],
            });
        }
        return this.connection;
    }

    close() {
        if (this.connection) {
            this.connection.close();
        }
    }
}

export default new AppDatabaseManager();
