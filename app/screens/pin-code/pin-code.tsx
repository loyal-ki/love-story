import {replace} from 'lodash';
import React, {useState} from 'react';
import {useIntl} from 'react-intl';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import {BlankSpacer, Spacing16, Spacing24} from '@app/components/alias';
import {CodeInputContainer} from '@app/components/code-input/code_input_container';
import {KeyboardNumberPad} from '@app/components/keyboard';
import {Label} from '@app/components/label';
import {Screen} from '@app/components/screen';
import {useDefaultHeaderHeight} from '@app/hooks';
import {formatSize, makeStyleSheetFromTheme} from '@app/utils';
import {typography} from '@app/utils/styles/typography';

import {useViewModel} from './pin-code.view-mode';

import {BaseScreens} from '@typings/screens/navigation';

export const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
        },
        row: {
            flexDirection: 'row',
        },
        bottom: {
            width: '100%',
            position: 'absolute',
            bottom: 0,
            marginBottom: formatSize(42),
            alignItems: 'center',
            alignSelf: 'center',
        },
        labelStyle: {
            ...typography.text20Bold,
            textAlign: 'center',
        },
        receive: {
            ...typography.text16Regular,
            color: theme.text,
        },
        resendButton: {},
        resend: {
            ...typography.text16Bold,
            color: theme.primary,
        },
        textContainer: {
            marginTop: formatSize(64),
            marginHorizontal: formatSize(Spacing24),
            alignItems: 'center',
        },
    })
);

export interface PinCodeScreenProps {
    componentId: BaseScreens;
}

const CODE_LENGTH = 6;

export const PinCodeScreen: React.FC<PinCodeScreenProps> = ({componentId}) => {
    const intl = useIntl();
    const viewModel = useViewModel();
    const defaultHeight = useDefaultHeaderHeight();
    const styles = getStyleSheet(viewModel.theme);
    const {formatMessage} = intl;

    const [keyboardInput, setKeyboardInput] = useState('');

    return (
        <Screen
            title={formatMessage({id: 'pin_code.page_title'}).toUpperCase()}
            theme={viewModel.theme}
            showBackButton
            defaultHeight={defaultHeight}
            componentId={componentId}>
            <View style={styles.container}>
                <View style={styles.textContainer}>
                    <Label
                        labelStyle={styles.labelStyle}
                        label="We sent you a code to verify your number"
                        theme={viewModel.theme}
                    />

                    <BlankSpacer height={Spacing16} />

                    <CodeInputContainer
                        theme={viewModel.theme}
                        value={keyboardInput}
                        length={CODE_LENGTH}
                    />

                    <BlankSpacer height={Spacing16} />

                    <View style={styles.row}>
                        <Text style={styles.receive}>
                            {formatMessage({id: 'pin_code.did_not_receive_label'})}{' '}
                        </Text>
                        <TouchableOpacity
                            style={styles.resendButton}
                            onPress={viewModel.restartCountdown}>
                            <Text style={styles.resend}>
                                {replace(
                                    formatMessage({id: 'pin_code.resend_label'}),
                                    '{time}',
                                    viewModel.resendTime
                                )}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.bottom}>
                    <KeyboardNumberPad
                        theme={viewModel.theme}
                        onInsert={num => {
                            if (keyboardInput.length >= CODE_LENGTH) {
                                return;
                            }
                            const newValue = keyboardInput.concat(num.toString());
                            setKeyboardInput(newValue);
                        }}
                        onDelete={() => setKeyboardInput(keyboardInput.slice(0, -1))}
                    />
                </View>
            </View>
        </Screen>
    );
};
