type ThemeType = 'dark' | 'light' | 'system';
type ThemeKey = 'dark' | 'light' | 'system';

type Theme = {
    type: ThemeType;
    background: string;
    primary: string;
    primarySecondary: string;
    text: string;
    textMessage: string;
    backButton: string;
    topBarBackground: string;
    topBarHeaderTextColor: string;
    arrow: string;
    indicator: string;
    selectedIcon: string;
    unSelectedIcon: string;
    unSelectedText: string;
    switchCircle: string;
    title: string;
    subTitle: string;
    disable: string;
    outlineButton: string;
    backgroundInput: string;
    textInput: string;
    success: string;
    warning: string;
    info: string;
    error: string;
    // Basic color
    white: string;
    black: string;
    grey: string;
};
