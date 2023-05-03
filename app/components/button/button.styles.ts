import {StyleSheet} from 'react-native';

import {makeStyleSheetFromTheme} from '@app/utils';

export const getButtonStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        container: {
            flexGrow: 1,
        },
        touchableOpacity: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
    })
);
