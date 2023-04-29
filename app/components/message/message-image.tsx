import React, {useMemo} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import FastImage, {ImageStyle} from 'react-native-fast-image';

import {useMemoizedCallback} from '@app/hooks';
import {MessageType} from '@app/models/message/message';
import {makeStyleSheetFromTheme} from '@app/utils';

const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        container: {
            alignItems: 'center',
            borderRadius: 15,
        },
    })
);

export interface MessageImageProps {
    theme: Theme;
    message: MessageType.DerivedImage;
    isCurrentUser: boolean;
}
export const MessageImage = React.memo(({theme, message, isCurrentUser}: MessageImageProps) => {
    const styles = getStyleSheet(theme);

    const imageContextStyle = useMemo(() => {
        const height = 120;
        const minWidth = 240;
        const borderRadius = 12;
        const borderBottomLeftRadius = isCurrentUser ? 20 : 0;
        const borderBottomRightRadius = isCurrentUser ? 0 : 20;

        return {
            height,
            minWidth,
            borderRadius,
            borderBottomLeftRadius,
            borderBottomRightRadius,
        } as ImageStyle;
    }, [isCurrentUser]);

    const renderImage = useMemoizedCallback(() => {
        return (
            <FastImage
                style={imageContextStyle}
                accessibilityRole="image"
                resizeMode="cover"
                source={{uri: message.uri}}
                fallback={Platform.OS === 'android'}
            />
        );
    }, [message.uri, imageContextStyle]);

    return <View style={styles.container}>{renderImage()}</View>;
});

MessageImage.displayName = 'MessageImage';
