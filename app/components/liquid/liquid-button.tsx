import React from 'react';
import {Dimensions} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {Vector} from 'react-native-redash';

import {Side} from './wave';

import ChevronLeftIcon from '@assets/svg/chevron_left.svg';
import ChevronRightIcon from '@assets/svg/chevron_right.svg';

const {width} = Dimensions.get('screen');
const RADIUS = 25;

interface LiquidButtonProps {
    position: Vector<Animated.SharedValue<number>>;
    side: Side;
    activeSide: Animated.SharedValue<Side>;
}

export const LiquidButton = ({position, side, activeSide}: LiquidButtonProps) => {
    const isLeft = side === Side.LEFT;
    const style = useAnimatedStyle(() => ({
        position: 'absolute',
        left: isLeft ? position.x.value - RADIUS * 2 : width - position.x.value,
        top: position.y.value - RADIUS,
        borderRadius: RADIUS,
        width: RADIUS * 2,
        height: RADIUS * 2,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: withTiming(activeSide.value === Side.NONE ? 1 : 0),
    }));
    return (
        <Animated.View style={style}>
            {isLeft ? (
                <ChevronRightIcon fill="white" height={28} width={28} />
            ) : (
                <ChevronLeftIcon fill="white" height={28} width={28} />
            )}
        </Animated.View>
    );
};
