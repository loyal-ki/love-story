import {WINDOW_WIDTH} from '@gorhom/bottom-sheet';
import {StyleSheet} from 'react-native';

import {makeStyleSheetFromTheme} from '@app/utils';
import {typography} from '@app/utils/styles/typography';

const percentByNumOfColumns = 1 / 6;
const sizeBox = WINDOW_WIDTH * percentByNumOfColumns;

export const getCodeInputNumberStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        container: {
            backgroundColor: 'transparent',
            borderStyle: 'dashed',
            borderWidth: 2,
            borderRadius: 4,
            margin: 4,
            flex: 1,
            width: sizeBox,
            height: sizeBox,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: theme.primary,
        },
        filled: {
            backgroundColor: theme.primary,
        },
        unFilled: {
            backgroundColor: theme.white,
        },
        text: {
            ...typography.text20Bold,
            textAlign: 'center',
            color: theme.text,
        },
        textFilled: {
            color: theme.white,
        },
        textUnFilled: {
            color: theme.text,
        },
    })
);

export const getCodeInputContainerStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        container: {
            flexDirection: 'row',
            overflow: 'hidden',
        },
    })
);
