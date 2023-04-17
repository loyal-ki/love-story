/* eslint-disable default-case */
import {HomeScreen, InitScreen, LoginScreen} from '@screens';
import React from 'react';
import {Platform, StyleProp, ViewStyle} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Navigation} from 'react-native-navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {withProviderWrapper} from '@app/components/provider_wrapper';
import {Screens} from '@app/constants';
import {Alert} from '@app/screens/alert/alert';
import {ExampleSheetScreen} from '@app/screens/bottom_sheet';
import {BottomSheet} from '@app/screens/bottom_sheet/bottom_sheet';

/* //////////////////////////////////////////////////////////////
                    GESTURE HANDLER WRAPPER
  ////////////////////////////////////////////////////////////// */
const withGestures = (Screen: React.ComponentType, styles: StyleProp<ViewStyle>) => {
    return function gestureHOC(props: any) {
        if (Platform.OS === 'android') {
            return (
                <GestureHandlerRootView style={[{flex: 1}, styles]}>
                    <Screen {...props} />
                </GestureHandlerRootView>
            );
        }

        return <Screen {...props} />;
    };
};

/* //////////////////////////////////////////////////////////////
                    SAFE AREA WRAPPER
  ////////////////////////////////////////////////////////////// */
const withSafeAreaInsets = (Screen: React.ComponentType) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, react/function-component-definition
    return function SafeAreaInsets(props: any) {
        return (
            <SafeAreaProvider>
                <Screen {...props} />
            </SafeAreaProvider>
        );
    };
};

/* //////////////////////////////////////////////////////////////
                    REGISTER SCREEN
  ////////////////////////////////////////////////////////////// */
export const registerScreens = (): void => {
    Navigation.registerComponent(Screens.INIT, () =>
        withGestures(withSafeAreaInsets(withProviderWrapper(InitScreen)), undefined)
    );
};

/* //////////////////////////////////////////////////////////////
                    LAZY LOAD COMPONENT SCREEN
  ////////////////////////////////////////////////////////////// */
Navigation.setLazyComponentRegistrator(screenName => {
    let screen: any | undefined;
    let extraStyles: StyleProp<ViewStyle>;

    switch (screenName) {
        case Screens.LOGIN:
            screen = withProviderWrapper(LoginScreen);
            break;
        case Screens.HOME:
            screen = withProviderWrapper(HomeScreen);
            break;
        case Screens.EXAMPLE_BOTTOM_SHEET:
            screen = withProviderWrapper(ExampleSheetScreen);
            break;
        case Screens.BOTTOM_SHEET:
            screen = withProviderWrapper(BottomSheet);
            break;
        case Screens.ALERT:
            screen = withProviderWrapper(Alert);
            break;
    }

    if (screen) {
        Navigation.registerComponent(screenName, () =>
            withGestures(withSafeAreaInsets(screen), extraStyles)
        );
    }
});
