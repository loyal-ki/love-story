import React from 'react';
import {
    type StyleProp,
    View,
    type ViewStyle,
    TouchableOpacityProps,
    TouchableOpacity,
} from 'react-native';

import {useMemoizedCallback} from '@app/hooks';

import {KeyContent} from './key-content';
import {getKeyboardNumberPadStyles} from './keyboard-num-pad.styles';
import {BackspaceKey, EmptyKey, IKeyNumPad, KeyNumPadTypes} from './keyboard-num-pad.type';

type KeyboardNumberPadProps = {
    containerStyle?: StyleProp<ViewStyle>;
    theme: Theme;
    onDelete: () => void;
    onInsert: (value: number) => void;
};

const makeDigit = (digit: number): IKeyNumPad => ({
    key: String(digit),
    type: KeyNumPadTypes.Digit,
    value: digit,
    render: (props: TouchableOpacityProps) => (
        <TouchableOpacity {...props}>
            <KeyContent>{digit}</KeyContent>
        </TouchableOpacity>
    ),
});

const keys: IKeyNumPad[] = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    .map(makeDigit)
    .concat([EmptyKey, makeDigit(0), BackspaceKey]);

export const KeyboardNumberPad = ({
    containerStyle,
    theme,
    onInsert,
    onDelete,
}: KeyboardNumberPadProps) => {
    const styles = getKeyboardNumberPadStyles(theme);

    const renderKey = useMemoizedCallback(
        item => {
            const KeyComponent = item.render;

            // eslint-disable-next-line consistent-return
            const onKeyPress = () => {
                if (item.type === KeyNumPadTypes.Backspace) {
                    return onDelete();
                }

                if (item.type === KeyNumPadTypes.Digit) {
                    return onInsert(item.value);
                }
            };

            return <KeyComponent style={styles.button} key={item.key} onPress={onKeyPress} />;
        },
        [onDelete, onInsert, styles.button]
    );

    return <View style={[styles.pad, containerStyle]}>{keys.map(renderKey)}</View>;
};
