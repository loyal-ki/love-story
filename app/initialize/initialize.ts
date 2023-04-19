import {logInfo} from '@app/utils';
import LocalDatabase from '@database/local_database';
import FCMService from '@managers/fcm_service';
import GlobalEventHandler from '@managers/global_event_handler';

let alreadyInitialized = false;

export const initialize = async () => {
    if (!alreadyInitialized) {
        alreadyInitialized = true;
        Promise.all([GlobalEventHandler.init(), LocalDatabase.init(), FCMService.init()]).then(
            values => {
                const result = values.filter(x => !x);
                if (result.length === 0) {
                    logInfo('[LAUNCHER] Successful initialization !!!');
                }
            }
        );
    }
};
