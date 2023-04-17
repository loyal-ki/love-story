import {onNavigateToInit} from '@navigation/navigation';

/* //////////////////////////////////////////////////////////////
                    INITIAL NAVIGATION
  ////////////////////////////////////////////////////////////// */
export const launchToInit = async () => {
    await onNavigateToInit();
};

/* //////////////////////////////////////////////////////////////
                    LAUNCH APP FROM DEEP LINK
  ////////////////////////////////////////////////////////////// */
export const launchAppFromDeepLink = async () => {
    // TODO: Coming soon
};

/* //////////////////////////////////////////////////////////////
                    LAUNCH APP FROM DEFAULT
  ////////////////////////////////////////////////////////////// */
export const launchApp = async () => {
    await launchToInit();
};

/* //////////////////////////////////////////////////////////////
                    INITIAL LAUNCHER APP 
  ////////////////////////////////////////////////////////////// */
export const initialLaunch = async () => {
    return launchApp();
};

export const relaunchApp = async () => {
    await launchApp();
};
