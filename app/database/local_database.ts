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
            logInfo('Successful initialization database !!!');
        }

        return true;
    };
}

export default new LocalDatabase();
