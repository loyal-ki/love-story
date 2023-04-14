import React from 'react';

import type {BaseScreens} from '@typings/screens/navigation';
import {Button, StyleSheet, Text, View} from 'react-native';
import {bottomSheet, onNavigationToScreen, showOverlayModal} from '@app/navigation/navigation';
import {Screens} from '@app/constants';

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
                title="Show Modal"
                onPress={() => {
                    showOverlayModal(Screens.EXAMPLE_BOTTOM_SHEET);
                }}
            />
            <Button
                title="Navigation to Home"
                onPress={() => {
                    onNavigationToScreen({screen: Screens.HOME});
                }}
            />
            <Button
                title="Bottom sheet"
                onPress={() => {
                    const renderContent = () => {
                        return (
                            <View>
                                <Text>Nghia</Text>
                            </View>
                        );
                    };

                    bottomSheet({
                        title: '',
                        renderContent,
                        closeButtonId: 'close-channel-quick-actions',
                    });
                }}
            />
        </View>
    );
};
