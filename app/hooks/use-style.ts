import {useMemo} from 'react';

import type {ImageStyle, StyleProp, TextStyle, ViewStyle} from 'react-native';

export const useLoadingStyle = (
    inputStyle: StyleProp<ViewStyle | ImageStyle | TextStyle>,
    isLoading: boolean
): StyleProp<ViewStyle | ImageStyle | TextStyle> => {
    const style = useMemo(() => {
        return [inputStyle, {opacity: isLoading ? 0 : 1}];
    }, [inputStyle, isLoading]);

    return style;
};
