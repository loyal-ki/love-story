import {StyleSheet} from 'react-native';

import {formatSize, makeStyleSheetFromTheme} from '@app/utils';
import {typography} from '@app/utils/styles/typography';

export const getSearchInputStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.backgroundInput,
            borderRadius: formatSize(8),
            paddingVertical: formatSize(10),
            paddingHorizontal: formatSize(12),
            marginVertical: formatSize(8),
            marginHorizontal: formatSize(16),
        },
        iconContainer: {
            position: 'absolute',
            top: 0,
            bottom: 0,
            marginLeft: formatSize(16),
            justifyContent: 'center',
            alignItems: 'center',
        },
        input: {
            ...typography.text16Bold,
            color: theme.textInput,
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: formatSize(36),
            borderRadius: formatSize(10),
        },
    })
);
