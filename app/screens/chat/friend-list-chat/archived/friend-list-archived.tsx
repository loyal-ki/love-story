import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {BlankSpacer, Spacing16} from '@app/components/alias';
import {useTheme} from '@app/context/theme';
import {formatSize, makeStyleSheetFromTheme} from '@app/utils';

import {useViewModel} from './friend-list-archived.view-model';

const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
    })
);

export const FriendListArchived: React.FC = () => {
    const viewModel = useViewModel();

    const {theme} = useTheme();
    const styles = getStyleSheet(theme);
    return (
        <View style={styles.container}>
            <BlankSpacer height={formatSize(Spacing16)} />
            <Text>Archived</Text>
        </View>
    );
};
