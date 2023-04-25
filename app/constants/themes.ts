export enum AppThemeEnum {
    light = 'light',
    dark = 'dark',
    system = 'system',
}

export const Themes = {
    dark: {
        type: 'dark',
        background: '#17223B',
        primary: '#E7AB9A',
        text: '#FFFFFF',
        error: '#E94560',
        backButton: '#C7BCA1',
        topBarBackground: '#DCD7C9',
        topBarHeaderTextColor: '#C7BCA1',
    },
    light: {
        type: 'light',
        background: '#FFFFFF',
        primary: '#FFACC7',
        text: '#060930',
        error: '#E94560',
        backButton: '#FFFFFF',
        topBarBackground: '#FFACC7',
        topBarHeaderTextColor: '#060930',
    },
} as Record<ThemeKey, Theme>;
