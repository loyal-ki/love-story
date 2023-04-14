import merge from 'deepmerge';

import {Screens} from '@app/constants';
import type {BaseScreens} from '@typings/screens/navigation';
import {Alert, Platform} from 'react-native';
import {
    Navigation,
    Options,
    OptionsModalPresentationStyle,
    ScreenPoppedEvent,
} from 'react-native-navigation';
import NavigationHandler from './navigation.handler';
import type {NavigationInfo} from './navigation.types';
import {defaultOptions} from './default.options';
import env from '@env';
import {formatLog, logInfo} from '@app/utils';

// NAVIGATION COMMAND TYPE
enum NavigationCommandEnum {
    setRoot = 'setRoot',
    push = 'push',
    showModal = 'showModal',
    popToRoot = 'popToRoot',
    popTo = 'popTo',
    dismissModal = 'dismissModal',
}

type BottomSheetArgs = {
    closeButtonId: string;
    initialSnapIndex?: number;
    // footerComponent?: React.FC<BottomSheetFooterProps>;
    renderContent: () => JSX.Element;
    // snapPoints: Array<number | string>;
    // theme: Theme;
    title: string;
};

export const registerNavigationListeners = () => {
    Navigation.events().registerScreenPoppedListener(onPoppedListener);
    Navigation.events().registerCommandListener(onCommandListener);
};

function onPoppedListener({componentId}: ScreenPoppedEvent) {
    NavigationHandler.removeScreenFromStack(componentId as BaseScreens);
}

/*//////////////////////////////////////////////////////////////
                    NAVIGATION COMMAND LISTENER 
  //////////////////////////////////////////////////////////////*/
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
    }
}

export const onNavigateToInit = () => {
    // set init-screen is default (root) when launch app
    const stack = {
        children: [
            {
                component: {
                    id: Screens.INIT,
                    name: Screens.INIT,
                    options: defaultOptions,
                },
            },
        ],
    };

    if (env.LOG_REQUESTS) {
        logInfo('INIT SCREEN SUCCESSFULLY');
    }

    return Navigation.setRoot({
        root: {stack},
    });
};

/*//////////////////////////////////////////////////////////////
                    VALIDATE SCREEN REGISTERED 
  //////////////////////////////////////////////////////////////*/
function isScreenRegistered(screen: BaseScreens) {
    const notImplemented = !Object.values(Screens).includes(screen);
    if (notImplemented) {
        Alert.alert(
            'Temporary error ' + screen,
            'The functionality you are trying to use has not been implemented yet'
        );
        return false;
    }

    return true;
}

/*//////////////////////////////////////////////////////////////
                    NAVIGATION COMMAND PUSH
  //////////////////////////////////////////////////////////////*/
export const onNavigationToScreen = ({screen, params = {}, options = {}}: NavigationInfo) => {
    if (!isScreenRegistered(screen)) {
        return '';
    }

    const componentId = NavigationHandler.getVisibleScreen();

    if (env.LOG_REQUESTS) {
        logInfo(`● [PUSH] TO SCREEN: ${componentId}\n` + '● [PARAMS]\n' + formatLog(params));
    }

    return Navigation.push(componentId, {
        component: {
            id: screen,
            name: screen,
            passProps: params,
            options: merge(defaultOptions, options),
        },
    });
};

/*//////////////////////////////////////////////////////////////
                    NAVIGATION COMMAND POP
  //////////////////////////////////////////////////////////////*/
export async function popScreen(screenId?: BaseScreens) {
    try {
        if (screenId) {
            if (env.LOG_REQUESTS) {
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

/*//////////////////////////////////////////////////////////////
                    NAVIGATION - RESET TO ROOT
  //////////////////////////////////////////////////////////////*/
export async function popToRoot() {
    const componentId = NavigationHandler.getVisibleScreen();

    try {
        if (env.LOG_REQUESTS) {
            logInfo(`● [POP] TO ROOT`);
        }

        await Navigation.popToRoot(componentId);
    } catch (error) {
        // RNN returns a promise rejection if there are no screens
        // atop the root screen to pop. We'll do nothing in this case.
    }
}

/*//////////////////////////////////////////////////////////////
                    NAVIGATION - SHOW BOTTOM SHEET
  //////////////////////////////////////////////////////////////*/
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

/*//////////////////////////////////////////////////////////////
                    NAVIGATION - SHOW MODAL
  //////////////////////////////////////////////////////////////*/
export function showOverlayModal(name: BaseScreens, passProps = {}, options: Options = {}) {
    let animations = {
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

    const defaultOptions = {
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
    const mergeOptions = merge(defaultOptions, options);
    showModal(name, '', passProps, mergeOptions);
}

/*//////////////////////////////////////////////////////////////
                    NAVIGATION - SHOW MODAL
  //////////////////////////////////////////////////////////////*/
export function showModal(name: BaseScreens, title: string, passProps = {}, options: Options = {}) {
    if (!isScreenRegistered(name)) {
        return;
    }

    if (env.LOG_REQUESTS) {
        logInfo(`● [SHOW] MODAL`);
    }

    const modalPresentationStyle: OptionsModalPresentationStyle =
        Platform.OS === 'ios'
            ? OptionsModalPresentationStyle.pageSheet
            : OptionsModalPresentationStyle.none;

    const defaultOptions: Options = {
        modalPresentationStyle,
        statusBar: {
            visible: true,
        },
        topBar: {
            animate: true,
            visible: true,
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
                        options: merge(defaultOptions, options),
                    },
                },
            ],
        },
    });
}

export async function dismissModal(options?: Options & {componentId: BaseScreens}) {
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

export const showReviewOverlay = () => {
    showOverlay(Screens.ALERT, {}, {overlay: {interceptTouchOutside: true}});
};

export function showOverlay(name: BaseScreens, passProps = {}, options: Options = {}) {
    if (!isScreenRegistered(name)) {
        return;
    }

    const defaultOptions = {
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
            options: merge(defaultOptions, options),
        },
    });
}

export async function dismissOverlay(componentId: BaseScreens) {
    try {
        await Navigation.dismissOverlay(componentId);
    } catch (error) {
        // RNN returns a promise rejection if there is no modal with
        // this componentId to dismiss. We'll do nothing in this case.
    }
}

export async function dismissAllModals(componentId: BaseScreens) {
    if (!NavigationHandler.hasModalsOpened()) {
        return;
    }

    try {
        const modals = [...NavigationHandler.getModalsInStack()];
        for await (const modal of modals) {
            await Navigation.dismissModal(modal, {animations: {dismissModal: {enabled: false}}});
        }
    } catch (error) {
        // RNN returns a promise rejection if there are no modals to
        // dismiss. We'll do nothing in this case.
    }
}

export const bottomSheetModalOptions = (): Options => {
    return {
        animations: {
            showModal: {
                enabled: false,
            },
            dismissModal: {
                enabled: false,
            },
        },
        modalPresentationStyle: Platform.select({
            ios: OptionsModalPresentationStyle.overFullScreen,
            default: OptionsModalPresentationStyle.overCurrentContext,
        }),
        statusBar: {
            backgroundColor: null,
            drawBehind: true,
            translucent: true,
        },
    };
};