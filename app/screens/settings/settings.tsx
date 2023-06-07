import React from 'react';
import {useIntl} from 'react-intl';

import {BlankSpacer} from '@app/components/alias';
import FreezeScreen from '@app/components/freeze';
import SettingOption from '@app/components/options';
import {Screen} from '@app/components/screen';
import {useDefaultHeaderHeight} from '@app/hooks/header';
import {makeStyleSheetFromTheme} from '@app/utils';

import {useViewModel} from './settings.view-model';

import type {BaseScreens} from '@typings/screens/navigation';

import DarkModeIcon from '@assets/svg/dark_mode.svg';
import LanguageIcon from '@assets/svg/language.svg';
import NotificationIcon from '@assets/svg/notification.svg';

const kIconColor = ['#7F669D', '#ECA869', '#FFE15D'];

const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) => ({
    flex: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    iconContainerStyle: {
        width: 40,
        height: 40,
        backgroundColor: theme.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    labelOptionStyle: {
        color: theme.text,
        fontSize: 18,
        fontWeight: '600',
    },
    descriptionOptionStyle: {
        color: theme.text,
        fontSize: 14,
        fontWeight: '300',
    },
}));

export interface SettingsScreenProps {
    componentId: BaseScreens;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({componentId}) => {
    const intl = useIntl();

    const viewModel = useViewModel(intl);

    const {formatMessage} = intl;

    const styles = getStyleSheet(viewModel.theme);

    const defaultHeight = useDefaultHeaderHeight();

    return (
        <FreezeScreen>
            <Screen
                title={formatMessage({id: 'settings.page_title'}).toUpperCase()}
                theme={viewModel.theme}
                showBackButton={false}
                showEdgesBottom={false}
                defaultHeight={defaultHeight}
                componentId={componentId}>
                <BlankSpacer height={24} />
                <SettingOption
                    iconContainerStyle={[
                        styles.iconContainerStyle,
                        {backgroundColor: kIconColor[0]},
                    ]}
                    iconLeft={<DarkModeIcon width={20} height={20} fill="#FFFFFF" />}
                    action={viewModel.useChangeThemeMode}
                    optionLabelTextStyle={styles.labelOptionStyle}
                    optionDescriptionTextStyle={styles.descriptionOptionStyle}
                    label={formatMessage({id: 'common.theme_mode'})}
                    description={formatMessage({
                        id: `common.theme_mode_${viewModel.theme.type}`,
                    })}
                    selected={viewModel.state.isDarkModeEnable}
                    type="toggle"
                />
                <BlankSpacer height={20} />
                <SettingOption
                    action={viewModel.openLanguageBottomSelect}
                    iconContainerStyle={[
                        styles.iconContainerStyle,
                        {backgroundColor: kIconColor[1]},
                    ]}
                    iconLeft={<LanguageIcon width={20} height={20} fill="#FFFFFF" />}
                    optionLabelTextStyle={styles.labelOptionStyle}
                    optionDescriptionTextStyle={styles.descriptionOptionStyle}
                    label={formatMessage({id: 'common.language'})}
                    description={formatMessage({
                        id: `common.language.${viewModel.state.settingLocale}`,
                    })}
                    type="arrow"
                />
                <BlankSpacer height={24} />
                <SettingOption
                    iconContainerStyle={[
                        styles.iconContainerStyle,
                        {backgroundColor: kIconColor[2]},
                    ]}
                    iconLeft={<NotificationIcon width={20} height={20} fill="#FFFFFF" />}
                    optionLabelTextStyle={styles.labelOptionStyle}
                    optionDescriptionTextStyle={styles.descriptionOptionStyle}
                    label={formatMessage({id: 'common.notification'})}
                    type="arrow"
                />
            </Screen>
        </FreezeScreen>
    );
};
