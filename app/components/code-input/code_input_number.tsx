import React, {FC} from 'react';
import {Text} from 'react-native';
import Animated, {FadeIn, FadeOut, ZoomIn, ZoomOut} from 'react-native-reanimated';

import {getCodeInputNumberStyleSheet} from './styles';

type Props = {
    filled: boolean;
    active: boolean;
    children?: string;
    theme: Theme;
};

export const CodeInputNumber: FC<Props> = ({children, filled, active, theme}: Props) => {
    const styles = getCodeInputNumberStyleSheet(theme);

    return (
        <Animated.View
            key={children}
            style={[styles.container, filled ? styles.filled : styles.unFilled]}
            entering={filled ? ZoomIn : FadeIn}
            exiting={filled ? ZoomOut : FadeOut}>
            <Text style={[styles.text, filled ? styles.textFilled : styles.textUnFilled]}>
                {children}
            </Text>
        </Animated.View>
    );
};
