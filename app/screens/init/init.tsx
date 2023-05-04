import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import PaginationDot from 'react-native-animated-pagination-dot';
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';

import {ButtonOutlineLarge} from '@app/components/button/button-large/button-outline-large';
import {Slide, Slider} from '@app/components/liquid';
import {Screens} from '@app/constants';
import {useTheme} from '@app/context/theme';
import {onNavigationToScreen} from '@app/navigation/navigation';
import {formatSize} from '@app/utils';

import {useViewModel} from './init.view-model';

import type {BaseScreens} from '@typings/screens/navigation';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    buttonsContainer: {
        width: '80%',
        height: formatSize(60),
        marginTop: formatSize(32),
        marginBottom: formatSize(12),
    },
    bottom: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        marginBottom: formatSize(42),
        alignItems: 'center',
        alignSelf: 'center',
    },
});

export interface IntroScreenProps {
    componentId: BaseScreens;
}

export const InitScreen: React.FC<IntroScreenProps> = ({componentId}) => {
    const {theme} = useTheme();
    const viewModel = useViewModel();
    const [index, setIndex] = useState(0);
    const prev = viewModel.slides[index - 1];
    const next = viewModel.slides[index + 1];

    const buttonOpacity = useSharedValue(0);

    const opacity = useAnimatedStyle(() => {
        return {
            opacity: buttonOpacity.value,
        };
    });

    useEffect(() => {
        if (index === viewModel.slides.length - 1) {
            buttonOpacity.value = withTiming(1, {
                duration: 1200,
            });
        } else {
            buttonOpacity.value = 0;
        }
    }, [buttonOpacity, index, viewModel.slides.length]);

    return (
        <View style={styles.container}>
            <Slider
                key={index}
                index={index}
                setIndex={setIndex}
                prev={prev && <Slide theme={theme} slide={prev} />}
                next={next && <Slide theme={theme} slide={next} />}>
                <Slide theme={theme} slide={viewModel.slides[index]} />
            </Slider>

            <View style={styles.bottom}>
                <PaginationDot
                    curPage={index}
                    activeDotColor={theme.background}
                    inactiveDotColor={theme.indicator}
                    maxPage={viewModel.slides.length}
                    sizeRatio={2}
                />
                <View style={styles.buttonsContainer}>
                    {index === viewModel.slides.length - 1 && (
                        <Animated.View style={opacity}>
                            <ButtonOutlineLarge
                                title="Navigation to Login"
                                onPress={async () => {
                                    await onNavigationToScreen({screen: Screens.LOGIN});
                                }}
                                theme={theme}
                            />
                        </Animated.View>
                    )}
                </View>
            </View>
        </View>
    );
};
