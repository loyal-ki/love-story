import {Themes} from '@app/constants/themes';
import {DatabaseService} from '@app/database';
import {useMemoizedCallback, useMount} from '@app/hooks';
import {logInfo} from '@app/utils';
import React, {useEffect, useState} from 'react';
import {ComponentType, createContext} from 'react';
import {Appearance} from 'react-native';

type Props = {
    children: React.ReactNode;
};

type WithThemeProps = {
    theme: Theme;
};

export function getDefaultThemeByAppearance() {
    if (Appearance.getColorScheme() === 'dark') {
        return Themes.dark;
    }
    return Themes.light;
}

export const ThemeContext = createContext(getDefaultThemeByAppearance());

const {Consumer, Provider} = ThemeContext;

const getTheme = (): Theme => {
    const defaultTheme = getDefaultThemeByAppearance();

    return defaultTheme;
};

export const ThemeProvider = ({children}: Props) => {
    const [theme, setTheme] = useState(() => getTheme());

    const init = useMemoizedCallback(() => {
        setTheme(getTheme());
    }, []);

    useMount(init);

    useEffect(() => {
        const listener = Appearance.addChangeListener(() => {
            const newTheme = getTheme();
            if (theme !== newTheme) {
                setTheme(newTheme);
            }
        });

        return () => listener.remove();
    }, [theme]);

    const updateTheme = useMemoizedCallback(async () => {
        await DatabaseService.preferencesRepository().setTheme(theme);
    }, [theme]);

    useEffect(() => {
        updateTheme();
    }, [theme, updateTheme]);

    return <Provider value={theme}>{children}</Provider>;
};

export function withTheme<T extends WithThemeProps>(Component: ComponentType<T>): ComponentType<T> {
    return function ThemeComponent(props) {
        return <Consumer>{(theme: Theme) => <Component {...props} theme={theme} />}</Consumer>;
    };
}

export function useTheme(): Theme {
    return React.useContext(ThemeContext);
}
