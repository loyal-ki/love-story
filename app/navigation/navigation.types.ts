import type {BaseScreens} from '@typings/screens/navigation';

export interface NavigationInfo {
    screen: BaseScreens;
    title?: string | undefined;
    options?: any | undefined;
    params?: any | undefined;
}
