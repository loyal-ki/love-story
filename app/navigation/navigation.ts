import merge from 'deepmerge';
import {Alert, Appearance, DeviceEventEmitter, Dimensions, Platform} from 'react-native';
import {
    Navigation,
    Options,
    OptionsModalPresentationStyle,
    ScreenPoppedEvent,
} from 'react-native-navigation';

import {Events, Screens} from '@app/constants';
import {getDefaultThemeByAppearance} from '@app/context/theme';
import {DatabaseLocal} from '@app/database';
import {formatLog, logInfo, setNavigatorStyles} from '@app/utils';
import {appearanceControlledScreens, mergeNavigationOptions} from '@app/utils/navigation';

import {bottomSheetModalOptions} from './default.options';
import NavigationHandler from './navigation.handler';

import type {NavigationInfo} from './navigation.types';
import type {BaseScreens} from '@typings/screens/navigation';

import env from '@env';

// NAVIGATION COMMAND TYPE
enum NavigationCommandEnum {
    setRoot = 'setRoot',
    push = 'push',
    showModal = 'showModal',
    popToRoot = 'popToRoot',
    popTo = 'popTo',
    dismissModal = 'dismissModal',
}

const alpha = {
    from: 0,
    to: 1,
    duration: 150,
};

type BottomSheetArgs = {
    closeButtonId: string;
    initialSnapIndex?: number;
    // footerComponent?: React.FC<BottomSheetFooterProps>;
    renderContent: () => JSX.Element;
    // snapPoints: Array<number | string>;
    // theme: Theme;
    title: string;
};

function onPoppedListener({componentId}: ScreenPoppedEvent) {
    NavigationHandler.removeScreenFromStack(componentId as BaseScreens);
}

/* //////////////////////////////////////////////////////////////
                    NAVIGATION COMMAND LISTENER 
  ////////////////////////////////////////////////////////////// */
function onCommandListener(name: string, params: any) {
    switch (name) {
        case NavigationCommandEnum.setRoot:
            NavigationHandler.clearScreensFromStack();
            NavigationHandler.addScreenToStack(params.layout.root.children[0].id);
            break;
        case NavigationCommandEnum.push:
            NavigationHandler.addScreenToStack(params.layout.id);
            break;
        case NavigationCommandEnum.showModal:
            NavigationHandler.addModalToStack(params.layout.children[0].id);
            break;
        case NavigationCommandEnum.popToRoot:
            NavigationHandler.clearScreensFromStack();
            NavigationHandler.addScreenToStack(Screens.INIT);
            break;
        case NavigationCommandEnum.popTo:
            NavigationHandler.popTo(params.componentId);
            break;
        case NavigationCommandEnum.dismissModal:
            NavigationHandler.removeModalFromStack(params.componentId);
            break;
        default:
            break;
    }
}

export const registerNavigationListeners = () => {
    Navigation.events().registerScreenPoppedListener(onPoppedListener);
    Navigation.events().registerCommandListener(onCommandListener);
};

export async function getThemeFromStorage(): Promise<Theme> {
    const theme = await DatabaseLocal.preferencesRepository().getTheme();
    return theme || getDefaultThemeByAppearance();
}

Appearance.addChangeListener(async () => {
    const theme = await getThemeFromStorage();
    const screens = NavigationHandler.getScreensInStack();

    if (screens.includes(Screens.INIT)) {
        // eslint-disable-next-line no-restricted-syntax
        for (const screen of screens) {
            if (appearanceControlledScreens.has(screen)) {
                Navigation.updateProps(screen, {theme});
                setNavigatorStyles(screen, theme, {}, theme.background);
            }
        }
    }
});

export const onNavigateToInit = async () => {
    const theme = await getThemeFromStorage();

    // set init-screen is default (root) when launch app
    const defaultOptionsFromTheme: Options = {
        layout: {
            componentBackgroundColor: theme.background,
        },
        popGesture: true,
        sideMenu: {
            left: {enabled: false},
            right: {enabled: false},
        },
        statusBar: {
            style: theme.type === 'dark' ? 'dark' : 'light',
        },
        topBar: {
            animate: false,
            visible: false,
            height: 0,
            backButton: {
                color: theme.backButton,
                title: '',
            },
            background: {
                color: theme.topBarBackground,
            },
            title: {
                alignment: 'center',
                color: theme.topBarHeaderTextColor,
            },
        },
    };

    const stack = {
        children: [
            {
                component: {
                    id: Screens.INIT,
                    name: Screens.INIT,
                    options: defaultOptionsFromTheme,
                },
            },
        ],
    };

    if (__DEV__ && env.LOG_REQUESTS) {
        logInfo('INIT SCREEN SUCCESSFULLY');
    }

    return Navigation.setRoot({
        root: {stack},
    });
};

/* //////////////////////////////////////////////////////////////
                    VALIDATE SCREEN REGISTERED 
  ////////////////////////////////////////////////////////////// */
function isScreenRegistered(screen: BaseScreens) {
    const notImplemented = !Object.values(Screens).includes(screen);
    if (notImplemented) {
        Alert.alert(
            `Temporary error ${screen}`,
            'The functionality you are trying to use has not been implemented yet'
        );
        return false;
    }

    return true;
}

/* //////////////////////////////////////////////////////////////
                    NAVIGATION COMMAND PUSH
  ////////////////////////////////////////////////////////////// */
export const onNavigationToScreen = async ({
    screen,
    title = '',
    params = {},
    options = {},
}: NavigationInfo) => {
    if (!isScreenRegistered(screen)) {
        return '';
    }

    const componentId = NavigationHandler.getVisibleScreen();

    if (__DEV__ && env.LOG_REQUESTS) {
        logInfo(`● [PUSH] TO SCREEN: ${componentId}\n ● [PARAMS]\n${formatLog(params)}`);
    }

    const theme = await getThemeFromStorage();

    const defaultOptionsFromTheme: Options = {
        animations: {
            push: {
                waitForRender: true,
                content: {
                    translationX: {
                        from: Dimensions.get('window').width,
                        to: 0,
                        duration: 350,
                    },
                },
            },
            pop: {
                content: {
                    translationX: {
                        from: 0,
                        to: Dimensions.get('window').width,
                        duration: 350,
                    },
                },
            },
        },
        layout: {
            componentBackgroundColor: theme.background,
        },
        popGesture: true,
        sideMenu: {
            left: {enabled: false},
            right: {enabled: false},
        },
        statusBar: {
            style: theme.type === 'dark' ? 'dark' : 'light',
            backgroundColor: theme.primary,
        },
        topBar: {
            animate: false,
            visible: false,
            backButton: {
                color: theme.backButton,
                title: '',
            },
            background: {
                color: theme.topBarBackground,
            },
            title: {
                fontSize: 16,
                alignment: 'center',
                color: theme.topBarHeaderTextColor,
                text: title.toUpperCase(),
            },
        },
    };

    return Navigation.push(componentId, {
        component: {
            id: screen,
            name: screen,
            passProps: params,
            options: merge(defaultOptionsFromTheme, options),
        },
    });
};

/* //////////////////////////////////////////////////////////////
                    NAVIGATION COMMAND PUSH
  ////////////////////////////////////////////////////////////// */
export const onNavigationToHomeScreen = async ({
    screen,
    params = {},
    options = {},
}: NavigationInfo) => {
    const componentId = NavigationHandler.getVisibleScreen();

    if (__DEV__ && env.LOG_REQUESTS) {
        logInfo(`● [RESET] TO SCREEN: ${componentId}\n ● [PARAMS]\n${formatLog(params)}`);
    }
    const theme = await getThemeFromStorage();

    // StatusBar.setBarStyle(theme.type === 'dark' ? 'light-content' : 'dark-content');

    const stack = {
        children: [
            {
                component: {
                    id: Screens.HOME,
                    name: Screens.HOME,
                    passProps: params,
                    options: {
                        layout: {
                            componentBackgroundColor: theme.background,
                        },
                        popGesture: true,
                        sideMenu: {
                            left: {enabled: false},
                            right: {enabled: false},
                        },
                        statusBar: {
                            backgroundColor: theme.primary,
                        },
                        topBar: {
                            visible: false,
                            height: 0,
                            backButton: {
                                visible: false,
                                color: theme.backButton,
                            },
                            background: {
                                color: theme.topBarBackground,
                            },
                            title: {
                                color: theme.topBarHeaderTextColor,
                            },
                        },
                    },
                },
            },
        ],
    };

    return Navigation.setRoot({
        root: {stack},
    });
};

/* //////////////////////////////////////////////////////////////
                    NAVIGATION COMMAND POP
  ////////////////////////////////////////////////////////////// */
export async function popScreen(screenId?: BaseScreens) {
    try {
        if (screenId) {
            if (__DEV__ && env.LOG_REQUESTS) {
                logInfo(`● [POP] SCREEN: ${screenId}`);
            }

            await Navigation.pop(screenId);
        } else {
            const componentId = NavigationHandler.getVisibleScreen();
            await Navigation.pop(componentId);
        }
    } catch (error) {
        // RNN returns a promise rejection if there are no screens
        // atop the root screen to pop. We'll do nothing in this case.
    }
}

/* //////////////////////////////////////////////////////////////
                    NAVIGATION - RESET TO ROOT
  ////////////////////////////////////////////////////////////// */
export async function popAllToRoot() {
    const componentId = NavigationHandler.getVisibleScreen();

    try {
        if (__DEV__ && env.LOG_REQUESTS) {
            logInfo(`● [POP] TO ROOT`);
        }

        await Navigation.popToRoot(componentId);
    } catch (error) {
        // RNN returns a promise rejection if there are no screens
        // atop the root screen to pop. We'll do nothing in this case.
    }
}

/* //////////////////////////////////////////////////////////////
                    NAVIGATION - SHOW MODAL
  ////////////////////////////////////////////////////////////// */
export function showModalAsScreen(
    name: BaseScreens,
    title: string,
    passProps = {},
    options: Options = {}
) {
    if (!isScreenRegistered(name)) {
        return;
    }

    if (__DEV__ && env.LOG_REQUESTS) {
        logInfo(`● [SHOW] MODAL`);
    }

    const modalPresentationStyle: OptionsModalPresentationStyle =
        Platform.OS === 'ios'
            ? OptionsModalPresentationStyle.pageSheet
            : OptionsModalPresentationStyle.none;

    const defaultStyleOptions: Options = {
        modalPresentationStyle,
        statusBar: {
            visible: true,
        },
        topBar: {
            animate: false,
            visible: false,
            height: 0,
            backButton: {
                color: '#000000',
                title: '',
            },
            background: {
                color: '#FFFFFF',
            },
            title: {
                color: '#000000',
                text: title,
            },
            leftButtonColor: '#000000',
            rightButtonColor: '#000000',
        },
        modal: {swipeToDismiss: false},
    };

    Navigation.showModal({
        stack: {
            children: [
                {
                    component: {
                        id: name,
                        name,
                        passProps: {
                            ...passProps,
                            isModal: true,
                        },
                        options: merge(defaultStyleOptions, options),
                    },
                },
            ],
        },
    });
}

/* //////////////////////////////////////////////////////////////
                    NAVIGATION - SHOW MODAL
  ////////////////////////////////////////////////////////////// */
export function showOverlayModal(name: BaseScreens, passProps = {}, options: Options = {}) {
    const animations = {
        showModal: {
            alpha: {
                from: 0,
                to: 1,
                duration: 250,
            },
        },
        dismissModal: {
            enter: {
                enabled: false,
            },
            exit: {
                enabled: false,
            },
        },
    };

    const defaultStyleOptions = {
        modalPresentationStyle: OptionsModalPresentationStyle.overCurrentContext,
        layout: {
            backgroundColor: 'transparent',
            componentBackgroundColor: 'transparent',
        },
        topBar: {
            visible: false,
            height: 0,
        },
        animations,
    };
    const mergeOptions = merge(defaultStyleOptions, options);
    showModalAsScreen(name, '', passProps, mergeOptions);
}

/* //////////////////////////////////////////////////////////////
                    NAVIGATION - SHOW BOTTOM SHEET
  ////////////////////////////////////////////////////////////// */
export async function bottomSheet({
    title,
    renderContent,
    // footerComponent,
    // snapPoints,
    initialSnapIndex = 1,
    closeButtonId,
}: BottomSheetArgs) {
    showOverlayModal(
        Screens.BOTTOM_SHEET,
        {
            initialSnapIndex,
            renderContent,
            // footerComponent,
            // snapPoints,
        },
        bottomSheetModalOptions()
    );
}

export async function dismissBottomSheet(alternativeScreen: BaseScreens = Screens.BOTTOM_SHEET) {
    DeviceEventEmitter.emit(Events.CLOSE_BOTTOM_SHEET);
    await NavigationHandler.waitUntilScreensIsRemoved(alternativeScreen);
}

export async function dismissModalIfShowing(options?: Options & {componentId: BaseScreens}) {
    if (!NavigationHandler.hasModalsOpened()) {
        return;
    }

    const componentId = options?.componentId || NavigationHandler.getVisibleModal();
    if (componentId) {
        try {
            await Navigation.dismissModal(componentId, options);
        } catch (error) {
            // RNN returns a promise rejection if there is no modal to
            // dismiss. We'll do nothing in this case.
        }
    }
}

export function showOverlay(name: BaseScreens, passProps = {}, options: Options = {}) {
    if (!isScreenRegistered(name)) {
        return;
    }

    const defaultStyleOptions = {
        layout: {
            backgroundColor: 'transparent',
            componentBackgroundColor: 'transparent',
        },
        overlay: {
            interceptTouchOutside: false,
        },
    };

    Navigation.showOverlay({
        component: {
            id: name,
            name,
            passProps,
            options: merge(defaultStyleOptions, options),
        },
    });
}

export const showReviewOverlay = () => {
    showOverlay(Screens.ALERT, {}, {overlay: {interceptTouchOutside: true}});
};

export async function dismissOverlay(componentId: BaseScreens) {
    try {
        await Navigation.dismissOverlay(componentId);
    } catch (error) {
        // RNN returns a promise rejection if there is no modal with
        // this componentId to dismiss. We'll do nothing in this case.
    }
}

export async function dismissAllModals() {
    if (!NavigationHandler.hasModalsOpened()) {
        return;
    }

    try {
        const modals = [...NavigationHandler.getModalsInStack()];
        // eslint-disable-next-line no-restricted-syntax
        for await (const modal of modals) {
            await Navigation.dismissModal(modal, {animations: {dismissModal: {enabled: false}}});
        }
    } catch (error) {
        // RNN returns a promise rejection if there are no modals to
        // dismiss. We'll do nothing in this case.
    }
}

export async function dismissAllOverlays() {
    try {
        await Navigation.dismissAllOverlays();
    } catch {
        // do nothing
    }
}

export async function updateThemeTopBarNavigation() {
    const screens = NavigationHandler.getScreensInStack();
    const theme = await getThemeFromStorage();

    // eslint-disable-next-line no-restricted-syntax
    for (const screen of screens) {
        if (appearanceControlledScreens.has(screen)) {
            try {
                const defaultOptionsFromTheme: Options = {
                    layout: {
                        componentBackgroundColor: theme.background,
                    },
                    popGesture: true,
                    sideMenu: {
                        left: {enabled: false},
                        right: {enabled: false},
                    },
                    statusBar: {
                        style: theme.type === 'dark' ? 'dark' : 'light',
                        backgroundColor: theme.primary,
                    },
                    topBar: {
                        backButton: {
                            color: theme.backButton,
                            title: '',
                        },
                        background: {
                            color: theme.topBarBackground,
                        },
                        title: {
                            color: theme.topBarHeaderTextColor,
                        },
                    },
                };

                mergeNavigationOptions(screen, defaultOptionsFromTheme);
            } catch (error) {
                // RNN update theme mode all screen by id
            }
        }
    }
}

export async function popToRootNavigation() {
    const componentId = NavigationHandler.getVisibleScreen();

    try {
        await Navigation.popToRoot(componentId);
    } catch (error) {
        // RNN returns a promise rejection if there are no screens
        // atop the root screen to pop. We'll do nothing in this case.
    }
}

export async function dismissAllModalsAndPopToRoot() {
    await dismissAllModals();
    await dismissAllOverlays();
    await popToRootNavigation();
}
