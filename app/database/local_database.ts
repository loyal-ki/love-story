import {logInfo} from '@app/utils';
import {DatabaseService} from '@database';

class LocalDatabase {
    init = async () => {
        const settled = await Promise.allSettled([
            DatabaseService.userRepository().initUser(),
            DatabaseService.preferencesRepository().initPreferences(),
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
