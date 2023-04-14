import type {Screens} from '@constants';
import type {OptionsTopBarButton} from 'react-native-navigation/lib/src/interfaces/Options';

export type NavButtons = {
    leftButtons?: OptionsTopBarButton[];
    rightButtons?: OptionsTopBarButton[];
};

type ScreenKeys = keyof typeof Screens;
export type BaseScreens = (typeof Screens)[ScreenKeys];
