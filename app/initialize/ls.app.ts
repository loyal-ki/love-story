import {registerScreens} from '@app/navigation';
import {registerNavigationListeners} from '@app/navigation/navigation';
import {initialize} from './initialize';
import {initialLaunch} from './launch';
import SplashScreen from 'react-native-splash-screen';

/*//////////////////////////////////////////////////////////////
                    APP ROOT
  //////////////////////////////////////////////////////////////*/
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
