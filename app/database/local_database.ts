import {logInfo} from '@app/utils';

import {DatabaseLocal} from '@database';

class LocalDatabase {
    init = async () => {
        const settled = await Promise.allSettled([
            DatabaseLocal.userRepository().initUser(),
            DatabaseLocal.preferencesRepository().initPreferences(),
        ]);

        const database = settled.reduce<unknown[]>((result, e) => {
            if (e.status === 'fulfilled') {
                result.push(e);
            }
            return result;
        }, []);

        if (database.length) {
            logInfo('Successful initialization database !!!');
        }

        return true;
    };
}

export default new LocalDatabase();
