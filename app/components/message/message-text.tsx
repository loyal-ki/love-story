import React, {useMemo} from 'react';
import {View, Text, StyleSheet, Linking} from 'react-native';

import {makeStyleSheetFromTheme} from '@app/utils';
import {Spacing16} from '@components/alias';

const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        textContainer: {
            marginHorizontal: Spacing16,
            marginVertical: Spacing16,
        },
        textSent: {
            color: theme.textMessage,
            fontSize: 16,
            fontWeight: '600',
            lineHeight: 22,
        },
        textReceived: {
            color: theme.text,
            fontSize: 16,
            fontWeight: '600',
            lineHeight: 22,
        },
    })
);

export interface MessageTextProps {
    text: string | undefined;
    theme: Theme;
    isCurrentUser: boolean;
}
export const MessageText = React.memo(({text, theme, isCurrentUser}: MessageTextProps) => {
    const styles = getStyleSheet(theme);

    const handleEmailPress = (email: string) => {
        try {
            Linking.openURL(`mailto:${email}`);
        } catch {
            // do nothing
        }
    };

    const containerContextStyle = useMemo(() => {
        return isCurrentUser ? styles.textSent : styles.textReceived;
    }, [isCurrentUser, styles.textReceived, styles.textSent]);

    return (
        <View style={styles.textContainer}>
            <Text style={containerContextStyle}>{text}</Text>
        </View>
    );
});

MessageText.displayName = 'MessageText';
