import * as ReactNative from 'react-native';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';
import 'react-native-gesture-handler/jestSetup';

jest.doMock('react-native', () => {
    const {
        Platform,
        StyleSheet,
        requireNativeComponent,
        Alert: RNAlert,
        InteractionManager: RNInteractionManager,
        Linking: RNLinking,
    } = ReactNative;

    const Alert = {
        ...RNAlert,
        alert: jest.fn(),
    };

    const InteractionManager = {
        ...RNInteractionManager,
        runAfterInteractions: jest.fn(cb => cb()),
    };

    const Linking = {
        ...RNLinking,
        openURL: jest.fn(),
        addEventListener: jest.fn(() => ({remove: jest.fn()})),
    };

    return Object.setPrototypeOf(
        {
            Platform: {
                ...Platform,
                OS: 'ios',
                Version: 12,
                constants: {
                    reactNativeVersion: {
                        major: 0,
                        minor: 64,
                    },
                },
            },
            StyleSheet,
            requireNativeComponent,
            Alert,
            InteractionManager,
            Linking,
        },
        ReactNative
    );
});
jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

jest.mock('react-native-localize', () => ({
    getTimeZone: () => 'World/Somewhere',
    getLocales: () => [
        {countryCode: 'US', languageTag: 'en-US', languageCode: 'en', isRTL: false},
        {countryCode: 'VN', languageTag: 'vi-VN', languageCode: 'vi', isRTL: false},
    ],
}));

jest.mock('@app/utils/navigation', () => ({
    appearanceControlledScreens: () => ['Init', 'Home', 'Login'],
}));

jest.mock('react-native-navigation', () => {
    const RNN = jest.requireActual('react-native-navigation');
    RNN.Navigation.setLazyComponentRegistrator = jest.fn();
    RNN.Navigation.setDefaultOptions = jest.fn();
    RNN.Navigation.registerComponent = jest.fn();
    return {
        ...RNN,
        Navigation: {
            ...RNN.Navigation,
            events: () => ({
                registerAppLaunchedListener: jest.fn(),
                registerComponentListener: jest.fn(() => ({remove: jest.fn()})),
                bindComponent: jest.fn(() => ({remove: jest.fn()})),
                registerNavigationButtonPressedListener: jest.fn(() => ({remove: jest.fn()})),
            }),
            setRoot: jest.fn(),
            pop: jest.fn(),
            push: jest.fn(),
            showModal: jest.fn(),
            dismissModal: jest.fn(),
            dismissAllModals: jest.fn(),
            popToRoot: jest.fn(),
            mergeOptions: jest.fn(),
            showOverlay: jest.fn(),
            dismissOverlay: jest.fn(),
        },
    };
});

jest.mock('@navigation/navigation', () => ({
    onNavigateToInit: jest.fn(),
    onNavigationToScreen: jest.fn(),
    onNavigationToHomeScreen: jest.fn(),
    popScreen: jest.fn(),
    popAllToRoot: jest.fn(),
    showModalAsScreen: jest.fn(),
    showOverlayModal: jest.fn(),
    bottomSheet: jest.fn(),
    dismissBottomSheet: jest.fn(),
    dismissModalIfShowing: jest.fn(),
    showOverlay: jest.fn(),
    showReviewOverlay: jest.fn(),
    updateThemeTopBarNavigation: jest.fn(() => Promise.resolve()),
    dismissOverlay: jest.fn(() => Promise.resolve()),
    dismissAllModals: jest.fn(() => Promise.resolve()),
    dismissAllOverlays: jest.fn(() => Promise.resolve()),
    dismissAllModalsAndPopToRoot: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-native-reanimated', () => {
    // eslint-disable-next-line global-require
    const {View} = require('react-native');
    return {
        Value: jest.fn(),
        event: jest.fn(),
        add: jest.fn(),
        eq: jest.fn(),
        set: jest.fn(),
        cond: jest.fn(),
        interpolate: jest.fn(),
        View,
        Extrapolate: {CLAMP: jest.fn()},
        Transition: {
            Together: 'Together',
            Out: 'Out',
            In: 'In',
        },
        Easing: {
            in: jest.fn(),
            out: jest.fn(),
            inOut: jest.fn(),
        },
    };
});
