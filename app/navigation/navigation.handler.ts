import type {BaseScreens} from '@typings/screens/navigation';

export class NavigationHandler {
    static removeScreenFromStack(arg0: string) {
        throw new Error('Method not implemented.');
    }
    static clearScreensFromStack() {
        throw new Error('Method not implemented.');
    }

    static addScreenToStack(id: any) {
        throw new Error('Method not implemented.');
    }

    static addModalToStack(id: any) {
        throw new Error('Method not implemented.');
    }

    static popTo(componentId: any) {
        throw new Error('Method not implemented.');
    }

    static removeModalFromStack(componentId: any) {
        throw new Error('Method not implemented.');
    }

    private screensInStack: BaseScreens[] = [];

    private modalsInStack: BaseScreens[] = [];

    private visibleTab = 'INIT';

    private tosOpen = false;

    addModalToStack = (modalId: BaseScreens): void => {
        this.removeModalFromStack(modalId);
        this.addScreenToStack(modalId);
        this.modalsInStack.unshift(modalId);
    };

    addScreenToStack = (screenId: BaseScreens): void => {
        this.removeScreenFromStack(screenId);
        this.screensInStack.unshift(screenId);
    };

    clearScreensFromStack = (): void => {
        this.screensInStack = [];
    };

    getModalsInStack = () => this.modalsInStack;

    getScreensInStack = () => this.screensInStack;

    getVisibleModal = () => this.modalsInStack[0];

    getVisibleScreen = () => this.screensInStack[0];

    getVisibleTab = () => this.visibleTab;

    hasModalsOpened = () => this.modalsInStack.length > 0;

    isToSOpen = () => this.tosOpen;

    popTo = (screenId: BaseScreens): void => {
        const index = this.screensInStack.indexOf(screenId);
        if (index > -1) {
            this.screensInStack.splice(0, index);
        }
    };

    removeScreenFromStack = (screenId: BaseScreens): void => {
        const index = this.screensInStack.indexOf(screenId);
        if (index > -1) {
            this.screensInStack.splice(index, 1);
        }
    };

    removeModalFromStack = (modalId: BaseScreens): void => {
        const indexInStack = this.screensInStack.indexOf(modalId);
        if (indexInStack > -1) {
            // This removes all the screens that were on top of the modal
            this.screensInStack.splice(0, indexInStack + 1);
        }

        const index = this.modalsInStack.indexOf(modalId);
        if (index > -1) {
            this.modalsInStack.splice(index, 1);
        }
    };

    setToSOpen = (open: boolean): void => {
        this.tosOpen = open;
    };

    setVisibleTap = (tab: string): void => {
        this.visibleTab = tab;
    };

    /**
     * Waits until a screen has been mounted and is part of the stack.
     * Use this function only if you know what you are doing
     * this function will run until the screen appears in the stack
     * and can easily run forever if the screen is never prevesented.
     * @param screenId string
     */
    waitUntilScreenHasLoaded = async (screenId: BaseScreens): Promise<void> => {
        let found = false;
        while (!found) {
            // eslint-disable-next-line no-await-in-loop
            await new Promise(r => requestAnimationFrame(r));

            found = this.screensInStack.includes(screenId);
        }
    };

    /**
     * Waits until a passed screen is the top screen
     * Use this function only if you know what you are doing
     * this function will run until the screen is in the top
     * @param screenId string
     */
    waitUntilScreenIsTop = async (screenId: BaseScreens): Promise<void> => {
        let found = false;
        while (!found) {
            // eslint-disable-next-line no-await-in-loop
            await new Promise(r => requestAnimationFrame(r));

            found = this.getVisibleScreen() === screenId;
        }
    };

    /**
     * Waits until a screen has been removed as part of the stack.
     * Use this function only if you know what you are doing
     * this function will run until the screen disappears from the stack
     * and can easily run forever if the screen is never removed.
     * @param screenId string
     */
    waitUntilScreensIsRemoved = async (screenId: BaseScreens): Promise<void> => {
        let found = false;
        while (!found) {
            // eslint-disable-next-line no-await-in-loop
            await new Promise(r => setTimeout(r, 250));

            found = !this.screensInStack.includes(screenId);
        }
    };
}

export default new NavigationHandler();
