import RNLocalize from 'react-native-localize';

import {logError} from '@app/utils';

class GlobalEventHandler {
    constructor() {
        RNLocalize.addEventListener('change', async () => {
            try {
                /* empty */
            } catch (e) {
                logError('Localize change', e);
            }
        });
    }

    init = () => {
        return true;
    };
}

export default new GlobalEventHandler();
