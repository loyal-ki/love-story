import {logError} from '@app/utils';
import RNLocalize from 'react-native-localize';

class GlobalEventHandler {
    constructor() {
        RNLocalize.addEventListener('change', async () => {
            try {
            } catch (e) {
                logError('Localize change', e);
            }
        });
    }

    init = () => {};
}

export default new GlobalEventHandler();
