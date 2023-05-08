import React, {useMemo} from 'react';
import FastImage from 'react-native-fast-image';

type Props = {
    forwardRef?: React.RefObject<any>;
    size: number;
    uri: string;
    theme: Theme;
};

export const Avatar = React.memo(({forwardRef, size, uri, theme}: Props) => {
    const fIStyle = useMemo(
        () => ({
            borderRadius: size / 2,
            backgroundColor: theme.backgroundInput,
            height: size,
            width: size,
        }),
        [size, theme.backgroundInput]
    );

    return <FastImage style={fIStyle} source={{uri}} resizeMode={FastImage.resizeMode.contain} />;
});

Avatar.displayName = 'Avatar';
