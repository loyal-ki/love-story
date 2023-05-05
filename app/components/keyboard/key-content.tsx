import React from 'react';
import {Text, TouchableOpacity, TouchableOpacityProps, View} from 'react-native';

import {useTheme} from '@app/context/theme';
import {Icon, IconNameEnum} from '@components/icon';

import {getKeyboardNumberPadStyles} from './keyboard-num-pad.styles';

type KeyContentProps = {
    children: React.ReactNode;
};

export const KeyContent = React.memo(({children}: KeyContentProps) => {
    const {theme} = useTheme();
    const styles = getKeyboardNumberPadStyles(theme);

    return (
        <View style={styles.button}>
            <Text style={styles.buttonText}>{children}</Text>
        </View>
    );
});

KeyContent.displayName = 'KeyContent';

export const EmptyKeyContent = React.memo(({children}: KeyContentProps) => {
    const {theme} = useTheme();
    const styles = getKeyboardNumberPadStyles(theme);

    return <View style={styles.button} />;
});

EmptyKeyContent.displayName = 'EmptyKeyContent';

export const BackspaceKeyContent = React.memo((props: TouchableOpacityProps) => {
    const {theme} = useTheme();
    const styles = getKeyboardNumberPadStyles(theme);

    return (
        <TouchableOpacity {...props} style={styles.button}>
            <Icon name={IconNameEnum.EraseIcon} size={36} color={theme.black} />
        </TouchableOpacity>
    );
});

BackspaceKeyContent.displayName = 'BackspaceKeyContent';
