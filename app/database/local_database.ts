import {DatabaseLocal} from '@database';

import {logInfo} from '@app/utils';

class LocalDatabase {
    init = async () => {
        const settled = await Promise.allSettled([
            DatabaseLocal.userRepository().initUser(),
            DatabaseLocal.preferencesRepository().initPreferences(),
        ]);

        const database = settled.reduce<any[]>((result, e) => {
            if (e.status === 'fulfilled') {
                result.push(e);
            }
            return result;
        }, []);

        if (database.length) {
            logInfo('INIT DATABASE SUCCESSFULLY !!!');
        }
    };
}

export default new LocalDatabase();
