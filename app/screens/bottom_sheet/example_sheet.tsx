import React from 'react';

import {dismissModal} from '@app/navigation/navigation';
import type {BaseScreens} from '@typings/screens/navigation';
import {Button, StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
});

export interface ExampleSheetScreenProps {
    componentId: BaseScreens;
}

export const ExampleSheetScreen: React.FC<ExampleSheetScreenProps> = () => {
    return (
        <View style={styles.container}>
            <View style={{height: 200}} />
            <Button
                title="Dismiss bottom sheet"
                onPress={() => {
                    dismissModal();
                }}
            />
        </View>
    );
};
