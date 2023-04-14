import GlobalEventHandler from '@managers/global_event_handler';
import LocalDatabase from '@database/local_database';

let alreadyInitialized = false;

export const initialize = async () => {
    if (!alreadyInitialized) {
        alreadyInitialized = true;
        await GlobalEventHandler.init();
        await LocalDatabase.init();
    }
};
