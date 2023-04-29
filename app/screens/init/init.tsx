import React from 'react';
import {useIntl} from 'react-intl';
import {Button, StyleSheet} from 'react-native';

import {Screen} from '@app/components/screen';
import {Screens} from '@app/constants';
import {useTheme} from '@app/context/theme';
import {useDefaultHeaderHeight} from '@app/hooks';

import type {BaseScreens} from '@typings/screens/navigation';

import {onNavigationToHomeScreen, onNavigationToScreen} from '@navigation/navigation';

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
    const intl = useIntl();
    const {theme, updateTheme} = useTheme();
    const defaultHeight = useDefaultHeaderHeight();
    const {formatMessage} = intl;

    return (
        <Screen
            title={formatMessage({id: 'chat.page_title'}).toUpperCase()}
            theme={theme}
            defaultHeight={defaultHeight}
            componentId={componentId}
            showBackButton={false}>
            <Button
                title="Navigation to Home"
                onPress={async () => {
                    await onNavigationToHomeScreen({screen: Screens.HOME});
                }}
            />
            <Button
                title="Navigation to Login"
                onPress={async () => {
                    await onNavigationToScreen({screen: Screens.LOGIN});
                }}
            />
        </Screen>
    );
};
