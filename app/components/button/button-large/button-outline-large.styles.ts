import {StyleSheet} from 'react-native';

import {formatSize, makeStyleSheetFromTheme} from '@app/utils';
import {typography} from '@app/utils/styles/typography';

export const getButtonOutlineLargeStyleConfig = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        titleStyle: {
            ...typography.text18Bold,
        },
        containerStyle: {
            height: formatSize(60),
            borderRadius: formatSize(8),
            borderWidth: 2,
            borderStyle: 'dashed',
        },
        iconStyle: {
            size: formatSize(20),
            marginRight: formatSize(2),
        },
        activeColorConfig: {
            titleColor: theme.outlineButton,
            borderColor: theme.outlineButton,
            backgroundColor: '',
        },
        disabledColorConfig: {
            titleColor: theme.arrow,
            backgroundColor: theme.disable,
        },
    })
);
