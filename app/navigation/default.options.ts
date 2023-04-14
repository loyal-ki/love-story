import { Navigation, Options } from "react-native-navigation";

export const defaultOptions: Options = {
    layout: {
        componentBackgroundColor: '#FFFFFF',
    },
    popGesture: true,
    sideMenu: {
        left: { enabled: false },
        right: { enabled: false },
    },
    statusBar: {
        style: 'light',
    },
    topBar: {
        animate: true,
        visible: true,
        backButton: {
            color: '#371F76',
            title: '',
            testID: 'screen.back.button',
        },
        background: {
            color: '#FFFFFF',
        },
        title: {
            color: '#371F76',
        },
    },
};

Navigation.setDefaultOptions({
    animations: {
        setRoot: {
            enter: {
                waitForRender: true,
                enabled: true,
                alpha: {
                    from: 0,
                    to: 1,
                    duration: 300,
                },
            },
        },
    },
    topBar: {
        title: {
            fontSize: 18,
            fontWeight: '600',
        },
        backButton: {
            enableMenu: false,
        },
        background: {
            color: '#FFFF00',
        },
        subtitle: {
            fontSize: 12,
            fontWeight: '400',
        },
    },
});