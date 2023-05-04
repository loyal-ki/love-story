import {StyleSheet} from 'react-native';

import {formatSize, makeStyleSheetFromTheme} from '@app/utils';
import {typography} from '@app/utils/styles/typography';

export const getButtonLargeStyleConfig = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        titleStyle: {
            ...typography.text14Bold,
        },
        containerStyle: {
            height: formatSize(52),
            borderRadius: formatSize(8),
        },
        iconStyle: {
            size: formatSize(16),
            marginRight: formatSize(2),
        },
        activeColorConfig: {
            titleColor: theme.title,
            backgroundColor: theme.primary,
        },
        disabledColorConfig: {
            titleColor: theme.arrow,
            backgroundColor: theme.disable,
        },
    })
);
