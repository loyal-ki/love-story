import {StyleSheet} from 'react-native';

import {makeStyleSheetFromTheme} from '@app/utils';

import {getButtonLargeStyleConfig} from './button-large.styles';

export const getButtonLargePrimaryStyleConfig = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        ...getButtonLargeStyleConfig(theme),
        activeColorConfig: {
            titleColor: theme.title,
            backgroundColor: theme.primary,
        },
        disabledColorConfig: {
            titleColor: theme.title,
            backgroundColor: theme.disable,
        },
    })
);
