import {NamedStyles} from '@typings/utils/styles';
import {StyleSheet} from 'react-native';

export function makeStyleSheetFromTheme<T extends NamedStyles<T>>(
    getStyleFromTheme: (a: Theme) => T
): (a: Theme) => T {
    let lastTheme: Theme;
    let style: T;
    return (theme: Theme) => {
        if (!style || theme !== lastTheme) {
            style = StyleSheet.create(getStyleFromTheme(theme));
            lastTheme = theme;
        }

        return style;
    };
}
