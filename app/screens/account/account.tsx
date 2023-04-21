import React from 'react';
import {StyleSheet, View} from 'react-native';

import type {BaseScreens} from '@typings/screens/navigation';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
});

export interface AccountScreenProps {
    componentId: BaseScreens;
}

export const AccountScreen: React.FC<AccountScreenProps> = ({componentId}) => {
    return <View style={styles.container} />;
};
