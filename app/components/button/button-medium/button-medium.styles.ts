import {StyleSheet} from 'react-native';

import {formatSize, makeStyleSheetFromTheme} from '@app/utils';

export const getButtonMediumStyleConfig = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        containerStyle: {
            height: formatSize(40),
            borderRadius: formatSize(8),
        },
        iconStyle: {
            size: formatSize(16),
            marginRight: formatSize(2),
        },
        activeColorConfig: {
            titleColor: theme.primary,
            backgroundColor: theme.primarySecondary,
        },
        disabledColorConfig: {
            titleColor: theme.arrow,
            backgroundColor: theme.unSelectedIcon,
        },
    })
);
