import React, {useState} from 'react';
import {useIntl} from 'react-intl';
import {Button, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {ButtonMedium} from '@app/components/button/button-medium/button-medium';
import {Screens} from '@app/constants';
import {useTheme} from '@app/context/theme';
import {useDefaultHeaderHeight} from '@app/hooks';
import {onNavigationToHomeScreen, onNavigationToScreen} from '@app/navigation/navigation';
import {formatSize} from '@app/utils';

import {useViewModel} from './init.view-model';

import type {BaseScreens} from '@typings/screens/navigation';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    buttonsContainer: {
        margin: formatSize(12),
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
    const viewModel = useViewModel();
    const [index, setIndex] = useState(0);
    const prev = viewModel.slides[index - 1];
    const next = viewModel.slides[index + 1];

    return (
        <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
            <View style={styles.container}>
                {/* <Slider
                key={index}
                index={index}
                setIndex={setIndex}
                prev={prev && <Slide theme={theme} slide={prev} />}
                next={next && <Slide theme={theme} slide={next} />}>
                <Slide theme={theme} slide={viewModel.slides[index]} />
            </Slider> */}

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

                <View style={styles.buttonsContainer}>
                    <ButtonMedium title="Navigation" onPress={() => {}} theme={theme} />
                </View>
            </View>
        </SafeAreaView>
    );
};
