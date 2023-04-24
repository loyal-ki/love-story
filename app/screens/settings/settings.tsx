import React, {useState} from 'react';
import {useIntl} from 'react-intl';
import {View} from 'react-native';

import SettingOption from '@app/components/options';
import {useTheme} from '@app/context/theme';
import {useMemoizedCallback} from '@app/hooks';
import {makeStyleSheetFromTheme} from '@app/utils';

import {showLanguageOptionsBottomSheet} from './advanced';

import type {BaseScreens} from '@typings/screens/navigation';

import DarkModeIcon from '@assets/svg/dark_mode.svg';

const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) => ({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    iconContainerStyle: {
        width: 32,
        height: 32,
        backgroundColor: theme.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
    },
    labelOptionStyle: {
        color: theme.text,
        fontSize: 16,
        fontWeight: '600',
    },
    descriptionOptionStyle: {
        color: theme.text,
        fontSize: 16,
        fontWeight: '300',
    },
}));

export interface SettingsScreenProps {
    componentId: BaseScreens;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = () => {
    const intl = useIntl();

    const {theme, updateTheme} = useTheme();

    const styles = getStyleSheet(theme);

    const [isEnabled, setIsEnabled] = useState(theme.type === 'dark');

    const useChangeThemeMode = useMemoizedCallback(() => {
        if (theme.type === 'dark') {
            updateTheme('light');
        } else {
            updateTheme('dark');
        }

        setIsEnabled(!isEnabled);
    }, [isEnabled, theme.type, updateTheme]);

    const openLanguageBottomSelect = useMemoizedCallback(() => {
        showLanguageOptionsBottomSheet({theme, title: '', intl});
    }, [intl, theme]);

    return (
        <View style={styles.container}>
            <SettingOption
                iconContainerStyle={styles.iconContainerStyle}
                iconLeft={<DarkModeIcon width={20} height={20} fill="#FFFFFF" />}
                action={useChangeThemeMode}
                optionLabelTextStyle={styles.labelOptionStyle}
                label="Dark Mode"
                selected={isEnabled}
                type="toggle"
            />

            <SettingOption
                action={openLanguageBottomSelect}
                iconContainerStyle={styles.iconContainerStyle}
                iconLeft={<DarkModeIcon width={20} height={20} fill="#FFFFFF" />}
                optionLabelTextStyle={styles.labelOptionStyle}
                optionDescriptionTextStyle={styles.descriptionOptionStyle}
                label="Language"
                description="English"
                selected={isEnabled}
                type="arrow"
            />
        </View>
    );
};
