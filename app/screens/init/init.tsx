import React from 'react';
import {Button, StyleSheet, View} from 'react-native';

import {Screens} from '@app/constants';

import type {BaseScreens} from '@typings/screens/navigation';

import {onNavigationToScreen} from '@navigation/navigation';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
});

export interface IntroScreenProps {
    componentId: BaseScreens;
}

export const InitScreen: React.FC<IntroScreenProps> = ({componentId}) => {
    return (
        <View style={styles.container}>
            <Button
                title="Navigation to Home"
                onPress={async () => {
                    await onNavigationToScreen({screen: Screens.HOME});
                }}
            />
            <Button
                title="Navigation to Login"
                onPress={async () => {
                    await onNavigationToScreen({screen: Screens.LOGIN});
                }}
            />
        </View>
    );
};
