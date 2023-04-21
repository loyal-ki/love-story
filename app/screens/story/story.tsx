import React from 'react';
import {StyleSheet, View} from 'react-native';

import type {BaseScreens} from '@typings/screens/navigation';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
});

export interface StoryScreenProps {
    componentId: BaseScreens;
}

export const StoryScreen: React.FC<StoryScreenProps> = ({componentId}) => {
    return <View style={styles.container} />;
};
