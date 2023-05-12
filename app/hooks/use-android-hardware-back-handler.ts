import NavigationHandler from '@navigation/navigation.handler';
import {BaseScreens} from '@typings/screens/navigation';
import {useEffect} from 'react';
import {BackHandler} from 'react-native';

export const useAndroidHardwareBackHandler = (
    componentId: BaseScreens | undefined,
    callback: () => void
) => {
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (NavigationHandler.getVisibleScreen() === componentId) {
                callback();
                return true;
            }

            return false;
        });

        return () => {
            backHandler.remove();
        };
    }, [callback, componentId]);
};
