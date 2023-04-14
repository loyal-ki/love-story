import { dismissModal, dismissOverlay } from '@app/navigation/navigation';
import {BaseScreens} from '@typings/screens/navigation';
import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import {Navigation} from 'react-native-navigation';
export interface HomeScreenProps {
    componentId: BaseScreens;
    title: string;
    message: string;
}

const styles = {
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000050',
    },
    alert: {
        alignItems: 'center',
        backgroundColor: 'whitesmoke',
        width: 250,
        elevation: 4,
        padding: 16,
    },
    title: {
        fontSize: 18,
    },
    message: {
        marginVertical: 8,
    },
};

export const Alert: React.FC<HomeScreenProps> = ({componentId, title, message}) => {
    const dismiss = () => dismissOverlay(componentId);

    return (
        <View style={styles.root}>
            <View style={styles.alert}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.message}>{message}</Text>
                <Button title="OK" onPress={dismiss} />
            </View>
        </View>
    );
};
