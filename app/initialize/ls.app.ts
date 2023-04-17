import {registerScreens} from '@navigation';
import {registerNavigationListeners} from '@navigation/navigation';
import SplashScreen from 'react-native-splash-screen';

import {initialize} from './initialize';
import {initialLaunch} from './launch';

/* //////////////////////////////////////////////////////////////
                    APP ROOT
  ////////////////////////////////////////////////////////////// */
export const LoveStoryApp = async () => {
    // Validate app initialized or not
    await initialize();

    registerNavigationListeners();

    // Register and observer all screen
    registerScreens();

    // Launch App
    initialLaunch();

    // Hide splash screen
    SplashScreen.hide();
};
