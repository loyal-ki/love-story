export enum AppThemeEnum {
    light = 'light',
    dark = 'dark',
    system = 'system',
}

export const Themes = {
    dark: {
        type: 'dark',
        background: '#222324',
        primary: '#7F669D',
        text: '#FFFFFF',
        error: '#ED2B2A',
    },
    light: {
        type: 'light',
        background: '#FFFFFF',
        primary: '#7F669D',
        text: '#222324',
        error: '#ED2B2A',
    },
} as Record<ThemeKey, Theme>;
