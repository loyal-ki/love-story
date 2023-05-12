import {SCREEN_WIDTH, WINDOW_WIDTH} from '@gorhom/bottom-sheet';
import React, {useMemo, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Svg, {Stop, Rect, LinearGradient} from 'react-native-svg';

import {BlankSpacer, Spacing2} from '@app/components/alias';
import {Avatar} from '@app/components/avatar';
import NavigationHeader from '@app/components/header';
import {useDefaultHeaderHeight} from '@app/hooks';
import {changeOpacity, makeStyleSheetFromTheme} from '@app/utils';

import {useViewModel} from './profile.view-model';

import {BaseScreens} from '@typings/screens/navigation';

type ProfileProps = {
    componentId: BaseScreens;
};

const IMG_HEIGHT = (SCREEN_WIDTH * 188) / 375;
const AVATAR_WIDTH = 90;
const AVATAR_BORDER = 102;
const OFFSET = AVATAR_WIDTH / 2;
const overlayLocations = [0.99, 0.9, 0.75, 0.5, 0.25, 0];

export const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        safeFlex: {
            flex: 1,
            backgroundColor: theme.primary,
        },
        flex: {
            flex: 1,
        },
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        header: {
            position: 'absolute',
            justifyContent: 'center',
            backgroundColor: theme.primary,
            top: 0,
            left: 0,
            right: 0,
            height: IMG_HEIGHT,
        },
        navigationBarContainer: {
            zIndex: 1,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
        },
        navigationGradientBarContainer: {
            zIndex: 1,
            position: 'absolute',
            left: 0,
            right: 0,
        },
        avatarContainer: {
            zIndex: 10,
            alignItems: 'center',
            alignSelf: 'center',
        },
        avatarBorder: {
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            borderRadius: AVATAR_BORDER / 2,
            borderWidth: 1.5,
            borderColor: theme.primary,
            borderStyle: 'dashed',
            width: AVATAR_BORDER,
            height: AVATAR_BORDER,
        },
        avatar: {
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            borderRadius: AVATAR_WIDTH / 2,
        },
    })
);

export const ProfileScreen: React.FC<ProfileProps> = ({componentId}: ProfileProps) => {
    const viewModel = useViewModel();

    const styles = getStyleSheet(viewModel.theme);

    const overlayColors = useMemo(
        () => [
            changeOpacity(viewModel.theme.background, 0.95),
            changeOpacity(viewModel.theme.background, 0.75),
            changeOpacity(viewModel.theme.background, 0.65),
            changeOpacity(viewModel.theme.background, 0.45),
            changeOpacity(viewModel.theme.background, 0.25),
            changeOpacity(viewModel.theme.background, 0.05),
        ],
        [viewModel.theme.background]
    );

    const {formatMessage} = viewModel.intl;

    const lastYOffset = useRef(0);

    const yOffset = useRef(new Animated.Value(0)).current;

    const headerHeight = useDefaultHeaderHeight();

    const translateY = yOffset.interpolate({
        inputRange: [-2, 0, IMG_HEIGHT - headerHeight, IMG_HEIGHT],
        outputRange: [-1, 0, 0, headerHeight],
    });

    const translateYHeaderCameraIcon = yOffset.interpolate({
        inputRange: [0, IMG_HEIGHT],
        outputRange: [0, -IMG_HEIGHT],
    });

    const scale = yOffset.interpolate({
        inputRange: [-IMG_HEIGHT, 0, 1],
        outputRange: [2, 1, 1],
    });

    const headerOpacity = yOffset.interpolate({
        inputRange: [-2, 0, IMG_HEIGHT - headerHeight - OFFSET, IMG_HEIGHT],
        outputRange: [0, 0, 1, 1],
    });

    const overlayOpacity = yOffset.interpolate({
        inputRange: [-2, 0, IMG_HEIGHT - headerHeight - OFFSET, IMG_HEIGHT],
        outputRange: [1, 1, 0, 0],
    });

    const animatedHeaderStyles = {
        transform: [{translateY}, {scale}],
    };

    const onScrollHandler = Animated.event([{nativeEvent: {contentOffset: {y: yOffset}}}], {
        useNativeDriver: true,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        listener: (event: any) => {
            lastYOffset.current = event.nativeEvent.contentOffset.y;
        },
    });

    return (
        <View style={styles.container}>
            <Animated.ScrollView
                onScroll={onScrollHandler}
                scrollEventThrottle={1}
                showsVerticalScrollIndicator={false}>
                <BlankSpacer height={IMG_HEIGHT - OFFSET} />
                <Animated.View style={[styles.header, animatedHeaderStyles]}>
                    <View style={styles.flex}>
                        <FastImage
                            style={styles.flex}
                            source={{
                                uri: 'https://images.pexels.com/photos/826114/pexels-photo-826114.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                            }}
                            resizeMode="cover"
                        />
                    </View>
                </Animated.View>

                <Animated.View
                    style={[
                        styles.navigationGradientBarContainer,
                        {
                            height: IMG_HEIGHT,
                        },
                    ]}>
                    <Svg>
                        <LinearGradient
                            id="Gradient"
                            gradientUnits="userSpaceOnUse"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2={IMG_HEIGHT}>
                            <Stop
                                offset="0"
                                stopColor={viewModel.theme.background}
                                stopOpacity="0.0"
                            />
                            <Stop
                                offset="0.25"
                                stopColor={viewModel.theme.background}
                                stopOpacity="0.25"
                            />
                            <Stop
                                offset="0.35"
                                stopColor={viewModel.theme.background}
                                stopOpacity="0.35"
                            />

                            <Stop
                                offset="0.5"
                                stopColor={viewModel.theme.background}
                                stopOpacity="0.5"
                            />

                            <Stop
                                offset="0.65"
                                stopColor={viewModel.theme.background}
                                stopOpacity="0.65"
                            />

                            <Stop
                                offset="0.75"
                                stopColor={viewModel.theme.background}
                                stopOpacity="0.75"
                            />
                            <Stop
                                offset="1"
                                stopColor={viewModel.theme.background}
                                stopOpacity="1"
                            />
                        </LinearGradient>
                        <Rect
                            x="0"
                            y="0"
                            width={WINDOW_WIDTH}
                            height={IMG_HEIGHT + Spacing2}
                            fill="url(#Gradient)"
                        />
                    </Svg>
                </Animated.View>
                <View style={styles.avatarContainer}>
                    <Animated.View style={[styles.avatarBorder, {opacity: overlayOpacity}]}>
                        <Avatar
                            style={styles.avatar}
                            uri="https://ss-images.saostar.vn/pc/1610639389284/ca-si-IU.jpg"
                            theme={viewModel.theme}
                            size={AVATAR_WIDTH}
                            resizeMode="cover"
                        />
                    </Animated.View>
                </View>

                <BlankSpacer height={1000} />
            </Animated.ScrollView>
            <Animated.View
                style={[
                    styles.navigationBarContainer,
                    {
                        opacity: headerOpacity,
                        height: headerHeight,
                    },
                ]}>
                <NavigationHeader
                    title={formatMessage({id: 'profile.page_title'}).toUpperCase()}
                    hasSearch={false}
                    showBackButton={false}
                />
            </Animated.View>
        </View>
    );
};
