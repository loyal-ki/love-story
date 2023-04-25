import {Navigation, Options} from 'react-native-navigation';

// eslint-disable-next-line import/no-cycle
import {Screens} from '@app/constants';

import {BaseScreens} from '@typings/screens/navigation';

export const appearanceControlledScreens = new Set<BaseScreens>([
    Screens.INIT,
    Screens.HOME,
    Screens.LOGIN,
]);

export function mergeNavigationOptions(componentId: string, options: Options) {
    Navigation.mergeOptions(componentId, options);
}
