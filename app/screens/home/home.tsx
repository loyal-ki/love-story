import React, {useRef, useState} from 'react';
import {useIntl} from 'react-intl';
import {Button, StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Animated from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

import FloatingInput from '@app/components/input';
import SettingOption from '@app/components/options';
import {Screens} from '@app/constants';
import {counterActions} from '@app/store/actions';
import { logDebug } from '@app/utils';

import {useViewModel} from './home.view_model';

import type {BaseScreens} from '@typings/screens/navigation';

import {onNavigationToScreen, showReviewOverlay} from '@navigation/navigation';

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
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
});

export interface HomeScreenProps {
    componentId: BaseScreens;
    theme: Theme;
}

const AnimatedSafeArea = Animated.createAnimatedComponent(SafeAreaView);

export const HomeScreen: React.FC<HomeScreenProps> = ({componentId, theme}) => {
    const intl = useIntl();
    const {formatMessage} = intl;
    const [isEnabled, setIsEnabled] = useState(false);

    const keyboardAwareRef = useRef<KeyboardAwareScrollView>(null);

    const viewModel = useViewModel();

    logDebug(viewModel.postList);

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
                        <View style={{height: 200}} />
                        <Icon
                            name="camera"
                            size={35}
                            color="#EEEFEF"
                            style={{
                                alignSelf: 'center',
                            }}
                        />
                        <Button
                            title={formatMessage({id: 'home.page_title'})}
                            onPress={() => {
                                viewModel.reduxDispatch(counterActions.setCounter(100));
                                onNavigationToScreen({screen: Screens.LOGIN});
                            }}
                        />
                        <Button
                            title="show alert"
                            onPress={() => {
                                showReviewOverlay();
                            }}
                        />
                        <FloatingInput
                            theme={theme}
                            autoCorrect={false}
                            autoCapitalize="none"
                            blurOnSubmit={false}
                            disableFullscreenUI
                            enablesReturnKeyAutomatically
                            onChangeText={viewModel.onLoginChange}
                            onSubmitEditing={viewModel.focusLogin}
                            error={viewModel.state.emailError ? viewModel.state.emailError : ''}
                            keyboardType="email-address"
                            label="Email"
                            ref={viewModel.loginRef}
                            value={viewModel.state.email}
                            returnKeyType="next"
                            showErrorIcon
                            spellCheck={false}
                        />

                        <SettingOption
                            action={setIsEnabled}
                            label="Setting"
                            selected={isEnabled}
                            type="toggle"
                        />
                    </View>
                </KeyboardAwareScrollView>
            </AnimatedSafeArea>
        </View>
    );
};
