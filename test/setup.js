import * as ReactNative from 'react-native';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

jest.doMock('react-native', () => {
    const {
        Platform,
        StyleSheet,
        requireNativeComponent,
        Alert: RNAlert,
        InteractionManager: RNInteractionManager,
        NativeModules: RNNativeModules,
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

jest.mock('@screens/navigation', () => ({
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
    dismissOverlay: jest.fn(),
    dismissAllModals: jest.fn(),
    dismissAllOverlays: jest.fn(),
    dismissAllModalsAndPopToRoot: jest.fn(),
}));
