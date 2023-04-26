import React from 'react';
import {Animated, StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
    dragIndicatorContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        top: -10,
    },
    dragIndicator: {
        backgroundColor: 'white',
        height: 4,
        width: 62.5,
        opacity: 0.9,
        borderRadius: 25,
    },
});

const Indicator = () => {
    return (
        <Animated.View style={styles.dragIndicatorContainer}>
            <View style={styles.dragIndicator} />
        </Animated.View>
    );
};

export default Indicator;
