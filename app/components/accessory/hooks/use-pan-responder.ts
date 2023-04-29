import * as React from 'react';
import {Animated, PanResponder, Platform} from 'react-native';

export const usePanResponder = () => {
    const positionY = React.useRef(new Animated.Value(0)).current;

    const panResponder = React.useRef(
        PanResponder.create({
            onPanResponderMove: Animated.event([null, {moveY: positionY}], {
                useNativeDriver: false,
            }),
            onPanResponderEnd: () => {
                setTimeout(() => {
                    positionY.setValue(0);
                }, 10);
            },
        })
    ).current;

    return {
        panHandlers: Platform.OS === 'android' ? {} : panResponder.panHandlers,
        positionY,
    };
};
