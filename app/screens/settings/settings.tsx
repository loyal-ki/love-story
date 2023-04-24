import React from 'react';
import {useIntl} from 'react-intl';
import {StyleSheet, View} from 'react-native';

import SettingOption from '@app/components/options';

import type {BaseScreens} from '@typings/screens/navigation';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
});

export interface SettingsScreenProps {
    componentId: BaseScreens;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = () => {
    const intl = useIntl();

    return (
        <View style={styles.container}>
            <SettingOption
                action={() => {}}
                label="Toggle"
                testID="clock_display_settings.twenty_four_hour.option"
                type="toggle"
            />
            <SettingOption
                action={() => {}}
                label="Select"
                testID="clock_display_settings.twenty_four_hour.option"
                type="select"
            />
            <SettingOption
                action={() => {}}
                label="Radio"
                testID="clock_display_settings.twenty_four_hour.option"
                type="radio"
            />
            <SettingOption
                action={() => {}}
                label="Arrow"
                testID="clock_display_settings.twenty_four_hour.option"
                type="arrow"
            />
            <SettingOption
                action={() => {}}
                label="Remove"
                testID="clock_display_settings.twenty_four_hour.option"
                type="remove"
            />
        </View>
    );
};
