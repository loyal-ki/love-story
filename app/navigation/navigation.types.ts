import type { BaseScreens } from "@typings/screens/navigation";

export interface NavigationInfo {
    screen: BaseScreens;
    options?: any | undefined;
    params?: any | undefined;
}
