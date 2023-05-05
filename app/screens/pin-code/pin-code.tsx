import React from 'react';
import {useIntl} from 'react-intl';
import {View, StyleSheet} from 'react-native';

import {KeyboardNumberPad} from '@app/components/keyboard';
import {Screen} from '@app/components/screen';
import {useDefaultHeaderHeight} from '@app/hooks';
import {formatSize, makeStyleSheetFromTheme} from '@app/utils';

import {useViewModel} from './pin-code.view-mode';

import {BaseScreens} from '@typings/screens/navigation';

export const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
        },
        bottom: {
            width: '100%',
            position: 'absolute',
            bottom: 0,
            marginBottom: formatSize(42),
            alignItems: 'center',
            alignSelf: 'center',
        },
    })
);

export interface PinCodeScreenProps {
    componentId: BaseScreens;
}

export const PinCodeScreen: React.FC<PinCodeScreenProps> = ({componentId}) => {
    const intl = useIntl();
    const viewModel = useViewModel();
    const defaultHeight = useDefaultHeaderHeight();
    const styles = getStyleSheet(viewModel.theme);
    const {formatMessage} = intl;

    return (
        <Screen
            title={formatMessage({id: 'pin_code.page_title'}).toUpperCase()}
            theme={viewModel.theme}
            showBackButton
            defaultHeight={defaultHeight}
            componentId={componentId}>
            <View style={styles.container}>
                <View style={styles.bottom}>
                    <KeyboardNumberPad
                        theme={viewModel.theme}
                        onInsert={value => {}}
                        onDelete={() => {}}
                    />
                </View>
            </View>
        </Screen>
    );
};
