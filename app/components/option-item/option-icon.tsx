import React, {useCallback, useMemo, useState} from 'react';
import FastImage from 'react-native-fast-image';

import {changeOpacity, makeStyleSheetFromTheme} from '@utils/theme';
import {isValidUrl} from '@utils/url';

import WifiOffIcon from '@assets/svg/wifi_off.svg';
import {useTheme} from '@context/theme';

type OptionIconProps = {
    icon: string;
    iconColor?: string;
    destructive?: boolean;
};

const getStyleSheet = makeStyleSheetFromTheme(() => {
    return {
        icon: {
            fontSize: 24,
            width: 24,
            height: 24,
        },
    };
});

const OptionIcon = ({icon, iconColor, destructive}: OptionIconProps) => {
    const {theme} = useTheme();
    const styles = getStyleSheet(theme);

    const [failedToLoadImage, setFailedToLoadImage] = useState(false);
    const onErrorLoadingIcon = useCallback(() => {
        setFailedToLoadImage(true);
    }, []);

    const iconAsSource = useMemo(() => {
        return {uri: icon};
    }, [icon]);

    if (isValidUrl(icon) && !failedToLoadImage) {
        return <FastImage source={iconAsSource} style={styles.icon} onError={onErrorLoadingIcon} />;
    }

    return (
        <WifiOffIcon
            height={24}
            width={24}
            stroke={iconColor || (destructive ? '#ff3333' : changeOpacity('#3f4350', 0.64))}
        />
    );
};

export default OptionIcon;
