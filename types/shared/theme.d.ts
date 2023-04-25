type ThemeType = 'dark' | 'light' | 'system';
type ThemeKey = 'dark' | 'light' | 'system';

type Theme = {
    type: ThemeType;
    background: string;
    primary: string;
    text: string;
    error: string;
    backButton: string;
    topBarBackground: string;
    topBarHeaderTextColor: string;
};
