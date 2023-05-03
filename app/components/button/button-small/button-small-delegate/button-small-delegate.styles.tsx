import {StyleSheet} from 'react-native';

import {makeStyleSheetFromTheme} from '@app/utils';
import {getButtonSmallSharedStyleConfig} from '@components/button/button-small/button-small.styles';

export const getButtonSmallDelegateStyles = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        ...getButtonSmallSharedStyleConfig(theme),
        activeColorConfig: {
            titleColor: theme.arrow,
            backgroundColor: theme.primary,
        },
    })
);
