export enum AppThemeEnum {
    light = 'light',
    dark = 'dark',
    system = 'system',
}

export const Themes = {
    dark: {
        type: 'dark',
        background: '#282A3A',
        primary: '#F2E5E5',
        primarySecondary: '#6B728E',
        text: '#F2E5E5',
        textMessage: '#354259',
        error: '#E94560',
        backButton: '#282A3A',
        topBarBackground: '#F2E5E5',
        topBarHeaderTextColor: '#C7BCA1',
        arrow: '#282A3A',
        indicator: '#F2E5E5',
        selectedIcon: '#282A3A',
        unSelectedIcon: '#354259',
        unSelectedText: '#968C83',
        switchCircle: '#F2E5E5',
    },
    light: {
        type: 'light',
        background: '#FFFFFF',
        primary: '#9182C4',
        primarySecondary: '#BCCEF8',
        text: '#0A1D37',
        textMessage: '#FFFFFF',
        error: '#E94560',
        backButton: '#FFFFFF',
        topBarBackground: '#9182C4',
        topBarHeaderTextColor: '#060930',
        arrow: '#FFFFFF',
        indicator: '#EEEEEE',
        selectedIcon: '#FFFFFF',
        unSelectedIcon: '#F7F7F7',
        unSelectedText: '#968C83',
        switchCircle: '#DDE7F2',
    },
} as Record<ThemeKey, Theme>;
