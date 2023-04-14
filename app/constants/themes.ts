export enum APP_THEME {
    light = 'light',
    dark = 'dark',
    system = 'system',
}

export const Themes = {
    dark: {
        type: 'dark',
        background: '#222324',
    },
    light: {
        type: 'light',
        background: '#FFFFFF',
    },
} as Record<ThemeKey, Theme>;
