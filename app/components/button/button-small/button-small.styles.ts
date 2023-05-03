import {StyleSheet} from 'react-native';

import {formatSize, generateShadow, makeStyleSheetFromTheme} from '@app/utils';

export const getButtonSmallSharedStyleConfig = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        containerStyle: {
            ...generateShadow(1, theme.backButton),
            height: formatSize(26),
            paddingHorizontal: formatSize(8),
            borderRadius: formatSize(17),
        },
    })
);
