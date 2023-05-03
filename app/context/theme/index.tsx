import React, {ComponentType, createContext, useMemo} from 'react';
import {Appearance} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {Themes} from '@app/constants/themes';
import {useMemoizedCallback, useMount} from '@app/hooks';
import {themeActions} from '@app/store/actions/theme/theme.action';
import {selectThemeFromStore} from '@app/store/selectors/theme/locale.selector';

type Props = {
    children: React.ReactNode;
};

type WithThemeProps = {
    theme: Theme;
    updateTheme: (value: ThemeType) => void;
};

export function getDefaultThemeByAppearance() {
    if (Appearance.getColorScheme() === 'dark') {
        return Themes.dark;
    }
    return Themes.light;
}

export function getThemeMode(value: ThemeType) {
    if (value === 'dark') {
        return Themes.dark;
    }
    return Themes.light;
}

export const ThemeContext = createContext({
    theme: getDefaultThemeByAppearance(),
    updateTheme: (value: ThemeType) => {},
});

const {Consumer, Provider} = ThemeContext;

const getTheme = (): Theme => {
    const defaultTheme = getDefaultThemeByAppearance();

    return defaultTheme;
};

/* //////////////////////////////////////////////////////////////
                    THEME CONFIGURATION 
  ////////////////////////////////////////////////////////////// */
export const ThemeProvider = ({children}: Props) => {
    const theme = useSelector(selectThemeFromStore);

    const reduxDispatch = useDispatch();

    const initAppTheme = useMemoizedCallback(() => {
        reduxDispatch(themeActions.fetchThemeFromDbRequest());
    }, [reduxDispatch]);

    const updateTheme = useMemoizedCallback(
        (value: ThemeType) => {
            const appTheme = getThemeMode(value);
            reduxDispatch(themeActions.setThemeToDbRequest(appTheme));
        },
        [reduxDispatch]
    );

    const themeRef = useMemo(() => {
        return {theme, updateTheme};
    }, [theme, updateTheme]);

    useMount(initAppTheme);

    return <Provider value={themeRef}>{children}</Provider>;
};

export function withTheme<T extends WithThemeProps>(Component: ComponentType<T>): ComponentType<T> {
    // eslint-disable-next-line react/function-component-definition
    return function ThemeComponent(props) {
        return (
            <Consumer>{({theme, updateTheme}) => <Component {...props} theme={theme} />}</Consumer>
        );
    };
}

export function useTheme(): WithThemeProps {
    return React.useContext(ThemeContext);
}
