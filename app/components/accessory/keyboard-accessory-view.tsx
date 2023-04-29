import * as React from 'react';
import {
    Animated,
    GestureResponderHandlers,
    StyleProp,
    StyleSheet,
    View,
    ViewStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {INPUT_HEIGHT} from '@app/constants/view';

import {useComponentSize, useKeyboardDimensions, usePanResponder} from './hooks';

interface Props {
    children?: React.ReactNode;
    contentContainerStyle?: StyleProp<ViewStyle>;
    contentOffsetKeyboardClosed?: number;
    contentOffsetKeyboardOpened?: number;
    defaultHeight: number;
    renderBackground?: () => React.ReactNode;
    renderScrollable: (panHandlers: GestureResponderHandlers) => React.ReactNode;
    scrollableContainerStyle?: StyleProp<ViewStyle>;
    spaceBetweenKeyboardAndAccessoryView?: number;
    style?: StyleProp<ViewStyle>;
    useListenersOnAndroid?: boolean;
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        right: 0,
    },
    contentContainer: {
        flex: 1,
    },
});

export const KeyboardAccessoryView = React.memo(
    ({
        children,
        contentContainerStyle,
        contentOffsetKeyboardClosed,
        contentOffsetKeyboardOpened,
        defaultHeight,
        renderBackground,
        renderScrollable,
        scrollableContainerStyle,
        spaceBetweenKeyboardAndAccessoryView,
        style,
        useListenersOnAndroid,
    }: Props) => {
        const {onLayout, size} = useComponentSize();
        const {keyboardEndPositionY, keyboardHeight} = useKeyboardDimensions(useListenersOnAndroid);
        const {panHandlers, positionY} = usePanResponder();
        const {bottom, left, right} = useSafeAreaInsets();

        const isLargerInputHeightDefault = size.height > INPUT_HEIGHT;

        const deltaY = Animated.subtract(positionY, keyboardEndPositionY).interpolate({
            inputRange: [0, Number.MAX_SAFE_INTEGER],
            outputRange: [0, Number.MAX_SAFE_INTEGER],
            extrapolate: 'clamp',
        });

        const offset =
            size.height +
            (keyboardHeight > 0 ? keyboardHeight : 0) +
            (keyboardHeight > 0
                ? (contentOffsetKeyboardOpened ?? 0) +
                  size.height -
                  defaultHeight -
                  (isLargerInputHeightDefault ? size.height - INPUT_HEIGHT : 0)
                : contentOffsetKeyboardClosed ?? 0);

        return (
            <>
                <Animated.View
                    style={[
                        {
                            flex: 1,
                            paddingBottom: offset,
                        },
                        scrollableContainerStyle,
                    ]}>
                    {renderScrollable(panHandlers)}
                </Animated.View>
                <Animated.View
                    style={[
                        {
                            bottom: Animated.subtract(
                                keyboardHeight > 0
                                    ? keyboardHeight -
                                          defaultHeight +
                                          (spaceBetweenKeyboardAndAccessoryView ?? 0)
                                    : 0,
                                deltaY
                            ),
                        },
                        styles.container,
                        style,
                    ]}
                    testID="container">
                    {renderBackground?.()}
                    <View
                        onLayout={onLayout}
                        style={[
                            styles.contentContainer,
                            {
                                marginBottom:
                                    keyboardHeight > 0
                                        ? size.height -
                                          (isLargerInputHeightDefault
                                              ? size.height - INPUT_HEIGHT
                                              : 0) +
                                          (contentOffsetKeyboardOpened ?? 0)
                                        : 0,
                                marginLeft: left,
                                marginRight: right,
                            },
                            contentContainerStyle,
                        ]}>
                        {children}
                    </View>
                </Animated.View>
            </>
        );
    }
);

KeyboardAccessoryView.displayName = 'KeyboardAccessoryView';
