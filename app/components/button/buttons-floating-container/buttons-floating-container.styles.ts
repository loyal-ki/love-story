import {StyleSheet} from 'react-native';

import {formatSize, makeStyleSheetFromTheme} from '@app/utils';

export const getButtonFloatingContainerStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        container: {
            borderTopWidth: formatSize(0.5),
            borderColor: theme.arrow,
            paddingTop: formatSize(8),
            paddingBottom: formatSize(16),
            paddingHorizontal: formatSize(8),
            backgroundColor: theme.primary,
        },
    })
);
