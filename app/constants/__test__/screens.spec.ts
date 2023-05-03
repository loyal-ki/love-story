import _ from 'lodash';

import Screens from '@constants/screens';

describe('Test screens.ts', () => {
    test('Validate if all screens have been registered in the application or not ', () => {
        const arr = _.values(Screens);
    });
});
