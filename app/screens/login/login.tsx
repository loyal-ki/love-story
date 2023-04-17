import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

import {selectCounter} from '@app/store/selectors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});

export const LoginScreen: React.FC = () => {
    const counter = useSelector(selectCounter);

    return (
        <View style={styles.container}>
            <Text>LOGIN {counter}</Text>
        </View>
    );
};
