import React, {useState} from 'react';
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
    const [isEnabled, setIsEnabled] = useState(false);

    return (
        <View style={styles.container}>
            <SettingOption
                action={setIsEnabled}
                label="Toggle"
                selected={isEnabled}
                type="toggle"
            />
            <SettingOption action={() => {}} label="Select" type="select" />
            <SettingOption action={setIsEnabled} label="Radio" selected={isEnabled} type="radio" />

            <SettingOption action={() => {}} label="Arrow" type="arrow" />
            <SettingOption action={() => {}} label="Remove" type="remove" />
        </View>
    );
};
