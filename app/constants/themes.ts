export enum AppThemeEnum {
    light = 'light',
    dark = 'dark',
    system = 'system',
}

export const Themes = {
    dark: {
        type: 'dark',
        background: '#16213E',
        primary: '#7F669D',
        text: '#FFFFFF',
        error: '#E94560',
    },
    light: {
        type: 'light',
        background: '#FFFFFF',
        primary: '#7F669D',
        text: '#222324',
        error: '#E94560',
    },
} as Record<ThemeKey, Theme>;
