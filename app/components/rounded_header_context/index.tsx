import React from 'react';
import {View} from 'react-native';

import {makeStyleSheetFromTheme} from '@utils/theme';

import {useTheme} from '@context/theme';

const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) => ({
    container: {
        backgroundColor: theme.background,
        height: 40,
        width: '100%',
        position: 'absolute',
    },
    content: {
        backgroundColor: theme.background,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        flex: 1,
    },
}));

const RoundedHeaderContext = () => {
    const {theme} = useTheme();
    const styles = getStyleSheet(theme);

    return (
        <View style={styles.container}>
            <View style={styles.content} />
        </View>
    );
};

export default RoundedHeaderContext;
