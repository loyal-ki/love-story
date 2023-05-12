import React, {useMemo} from 'react';
import {StyleProp} from 'react-native';
import FastImage, {ResizeMode, ImageStyle} from 'react-native-fast-image';

type Props = {
    style?: StyleProp<ImageStyle>;
    size: number;
    uri: string;
    theme: Theme;
    resizeMode?: ResizeMode;
};

export const Avatar = React.memo(({style, size, uri, theme, resizeMode}: Props) => {
    const fIStyle = useMemo(
        () => [
            {
                borderRadius: size / 2,
                backgroundColor: theme.backgroundInput,
                height: size,
                width: size,
            },
            style,
        ],
        [size, style, theme.backgroundInput]
    );

    return (
        <FastImage
            style={fIStyle}
            source={{uri}}
            resizeMode={resizeMode ?? FastImage.resizeMode.contain}
        />
    );
});

Avatar.displayName = 'Avatar';
