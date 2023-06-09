export enum AppThemeEnum {
    light = 'light',
    dark = 'dark',
    system = 'system',
}

export const BasicColor = {
    success: '#50C19A',
    warning: '#FFD571',
    info: '#6DA9E4',
    error: '#E94560',
    white: '#FFFFFF',
    black: '#000000',
    grey: '#F9F5EB',
};

export const Themes = {
    dark: {
        ...BasicColor,
        type: 'dark',
        background: '#282A3A',
        primary: '#F2E5E5',
        primarySecondary: '#6B728E',
        text: '#F2E5E5',
        textMessage: '#354259',
        backButton: '#F2E5E5',
        topBarBackground: '#F2E5E5',
        topBarHeaderTextColor: '#282A3A',
        arrow: '#F2E5E5',
        indicator: '#F2E5E5',
        selectedIcon: '#282A3A',
        unSelectedIcon: '#354259',
        unSelectedText: '#968C83',
        switchCircle: '#F2E5E5',
        textInput: '#282A3A',
        title: '#282A3A',
        subTitle: '#282A3A',
        disable: '#EEF1FF',
        backgroundInput: '#EEF1FF',
        outlineButton: '#FFFFFF',
    },
    light: {
        ...BasicColor,
        type: 'light',
        background: '#FFFFFF',
        primary: '#9182C4',
        primarySecondary: '#BCCEF8',
        text: '#0A1D37',
        textMessage: '#FFFFFF',
        backButton: '#0A1D37',
        topBarBackground: '#9182C4',
        topBarHeaderTextColor: '#FFFFFF',
        arrow: '#FFFFFF',
        indicator: '#EEEEEE',
        selectedIcon: '#FFFFFF',
        unSelectedIcon: '#F7F7F7',
        unSelectedText: '#968C83',
        switchCircle: '#DDE7F2',
        title: '#FFFFFF',
        textInput: '#282A3A',
        subTitle: '#F1F1F1',
        disable: '#EEF1FF',
        outlineButton: '#FFFFFF',
        backgroundInput: '#EEF1FF',
    },
} as Record<ThemeKey, Theme>;
