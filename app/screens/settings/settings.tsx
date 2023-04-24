import React from 'react';
import {View} from 'react-native';

import {BlankSpacer} from '@app/components/alias';
import SettingOption from '@app/components/options';
import {makeStyleSheetFromTheme} from '@app/utils';

import {useViewModel} from './settings.view_model';

import type {BaseScreens} from '@typings/screens/navigation';

import DarkModeIcon from '@assets/svg/dark_mode.svg';
import LanguageIcon from '@assets/svg/language.svg';
import NotificationIcon from '@assets/svg/notification.svg';

const kIconColor = ['#7F669D', '#ECA869', '#FFE15D'];

const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) => ({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    iconContainerStyle: {
        width: 36,
        height: 36,
        backgroundColor: theme.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 18,
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
    const viewModel = useViewModel();

    const {formatMessage} = viewModel.intl;

    const styles = getStyleSheet(viewModel.theme);

    return (
        <View style={styles.container}>
            <BlankSpacer height={12} />
            <SettingOption
                iconContainerStyle={[styles.iconContainerStyle, {backgroundColor: kIconColor[0]}]}
                iconLeft={<DarkModeIcon width={20} height={20} fill="#FFFFFF" />}
                action={viewModel.useChangeThemeMode}
                optionLabelTextStyle={styles.labelOptionStyle}
                label={formatMessage({id: 'common.theme_mode'})}
                selected={viewModel.state.isDarkModeEnable}
                type="toggle"
            />
            <BlankSpacer height={12} />
            <SettingOption
                action={viewModel.openLanguageBottomSelect}
                iconContainerStyle={[styles.iconContainerStyle, {backgroundColor: kIconColor[1]}]}
                iconLeft={<LanguageIcon width={20} height={20} fill="#FFFFFF" />}
                optionLabelTextStyle={styles.labelOptionStyle}
                optionDescriptionTextStyle={styles.descriptionOptionStyle}
                label={formatMessage({id: 'common.language'})}
                description={formatMessage({id: `common.language.${viewModel.state.settingLocale}`})}
                type="arrow"
            />
            <BlankSpacer height={12} />
            <SettingOption
                iconContainerStyle={[styles.iconContainerStyle, {backgroundColor: kIconColor[2]}]}
                iconLeft={<NotificationIcon width={20} height={20} fill="#FFFFFF" />}
                optionLabelTextStyle={styles.labelOptionStyle}
                optionDescriptionTextStyle={styles.descriptionOptionStyle}
                label={formatMessage({id: 'common.notification'})}
                type="arrow"
            />
        </View>
    );
};
