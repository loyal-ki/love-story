import {StyleSheet} from 'react-native';

import {formatSize, makeStyleSheetFromTheme} from '@app/utils';
import {typography} from '@app/utils/styles/typography';

export const getLabelStyles = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        container: {
            marginBottom: formatSize(4),
            marginHorizontal: formatSize(4),
        },
        label: {
            ...typography.text16Regular,
            color: theme.text,
            marginBottom: formatSize(4),
        },
        labelContainer: {
            flexDirection: 'row',
            alignItems: 'baseline',
        },
    })
);

export const getDescriptionStyles = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        description: {
            ...typography.text14Regular,
            color: theme.unSelectedText,
            marginBottom: formatSize(4),
        },
        boldDescriptionPiece: {
            ...typography.text14Bold,
        },
    })
);
