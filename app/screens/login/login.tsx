import React, {useRef} from 'react';
import {useIntl} from 'react-intl';
import {Animated, SafeAreaView, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {BlankSpacer} from '@app/components/alias';
import FloatingInput from '@app/components/input';
import {makeStyleSheetFromTheme} from '@app/utils';

import {useViewModel} from './login.view_model';

import {BaseScreens} from '@typings/screens/navigation';

const getStyleSheet = makeStyleSheetFromTheme(theme => {
    return {
        flex: {
            flex: 1,
        },
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        innerContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 24,
        },
        centered: {
            flex: 1,
            width: '100%',
        },
    };
});

export interface LoginScreenProps {
    componentId: BaseScreens;
}

const AnimatedSafeArea = Animated.createAnimatedComponent(SafeAreaView);

export const LoginScreen: React.FC<LoginScreenProps> = () => {
    const intl = useIntl();

    const {formatMessage} = intl;

    const keyboardAwareRef = useRef<KeyboardAwareScrollView>(null);

    const viewModel = useViewModel();
    const styles = getStyleSheet(viewModel.theme);

    return (
        <View style={styles.container}>
            <AnimatedSafeArea style={[styles.container]}>
                <KeyboardAwareScrollView
                    bounces
                    contentContainerStyle={[styles.innerContainer]}
                    enableAutomaticScroll
                    enableOnAndroid={false}
                    enableResetScrollToCoords
                    extraScrollHeight={0}
                    keyboardDismissMode="interactive"
                    keyboardShouldPersistTaps="handled"
                    ref={keyboardAwareRef}
                    scrollToOverflowEnabled
                    style={styles.flex}>
                    <View style={styles.centered}>
                        <BlankSpacer height={20} />
                        <FloatingInput
                            theme={viewModel.theme}
                            autoCorrect={false}
                            autoCapitalize="none"
                            blurOnSubmit={false}
                            disableFullscreenUI
                            placeholder={formatMessage({id: 'home.input_email_placeholder'})}
                            enablesReturnKeyAutomatically
                            onChangeText={viewModel.onLoginChange}
                            onSubmitEditing={viewModel.focusLogin}
                            error={
                                viewModel.state.emailError
                                    ? formatMessage({id: viewModel.state.emailError})
                                    : ''
                            }
                            keyboardType="email-address"
                            label={formatMessage({id: 'home.input_email_title'})}
                            ref={viewModel.loginRef}
                            value={viewModel.state.email}
                            returnKeyType="next"
                            showErrorIcon
                            spellCheck={false}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </AnimatedSafeArea>
        </View>
    );
};
