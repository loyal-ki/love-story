import React, {useMemo} from 'react';
import {Platform, Text, View} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import TouchableWithFeedback from '@app/components/touchable-with-feedback';
import {LARGE_HEADER_TITLE_HEIGHT} from '@app/constants/view';
import {changeOpacity, makeStyleSheetFromTheme} from '@utils/theme';

import ArrowLeftIcon from '@assets/svg/chevron_left.svg';

export type HeaderRightButton = {
    borderless?: boolean;
    buttonType?: 'native' | 'opacity' | 'highlight';
    iconRightComponent?: React.ReactElement;
    onPress: () => void;
    rippleRadius?: number;
    testID?: string;
};

type Props = {
    defaultHeight: number;
    hasSearch: boolean;
    isLargeTitle: boolean;
    heightOffset: number;
    leftComponent?: React.ReactElement;
    onBackPress?: () => void;
    onTitlePress?: () => void;
    rightButtons?: HeaderRightButton[];
    scrollValue?: Animated.SharedValue<number>;
    lockValue?: Animated.SharedValue<number | null>;
    showBackButton?: boolean;
    subtitle?: string;
    subtitleCompanion?: React.ReactElement;
    theme: Theme;
    title?: string;
};

const hitSlop = {top: 20, bottom: 20, left: 20, right: 20};
const rightButtonHitSlop = {top: 20, bottom: 5, left: 5, right: 5};

const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) => ({
    centered: {
        alignItems: Platform.select({android: 'flex-start', ios: 'center'}),
    },
    container: {
        alignItems: 'center',
        backgroundColor: theme.primary,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingHorizontal: 16,
        zIndex: 10,
    },
    subtitleContainer: {
        flexDirection: 'row',
        justifyContent: Platform.select({android: 'flex-start', ios: 'center'}),
        left: Platform.select({ios: undefined, default: 3}),
    },
    subtitle: {
        color: changeOpacity(theme.text, 0.72),
        lineHeight: 12,
        marginBottom: 8,
        marginTop: 2,
        height: 13,
    },
    titleContainer: {
        alignItems: Platform.select({android: 'flex-start', ios: 'center'}),
        justifyContent: 'center',
        flex: 3,
        height: '100%',
        paddingHorizontal: 8,
        ...Platform.select({
            ios: {
                paddingHorizontal: 60,
                flex: undefined,
                width: '100%',
                position: 'absolute',
                left: 16,
                bottom: 0,
                zIndex: 1,
            },
        }),
    },
    leftAction: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    leftContainer: {
        height: '100%',
        justifyContent: 'center',
        ...Platform.select({
            ios: {
                paddingLeft: 16,
                zIndex: 5,
                position: 'absolute',
                bottom: 0,
            },
        }),
    },
    rightContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        height: '100%',
        justifyContent: 'flex-end',
        ...Platform.select({
            ios: {
                right: 16,
                bottom: 0,
                position: 'absolute',
                zIndex: 2,
            },
        }),
    },
    rightIcon: {
        marginLeft: 10,
    },
    title: {
        fontSize: 16,
        color: theme.background,
        fontWeight: '600',
    },
}));

const Header = ({
    defaultHeight,
    hasSearch,
    isLargeTitle,
    heightOffset,
    leftComponent,
    onBackPress,
    onTitlePress,
    rightButtons,
    scrollValue,
    lockValue,
    showBackButton = true,
    subtitle,
    subtitleCompanion,
    theme,
    title,
}: Props) => {
    const styles = getStyleSheet(theme);
    const insets = useSafeAreaInsets();

    const opacity = useAnimatedStyle(() => {
        if (!isLargeTitle) {
            return {opacity: 1};
        }

        if (hasSearch) {
            return {opacity: 0};
        }

        const barHeight = heightOffset - LARGE_HEADER_TITLE_HEIGHT;
        const val = scrollValue?.value ?? 0;
        const showDuration = 200;
        const hideDuration = 50;
        const duration = val >= barHeight ? showDuration : hideDuration;
        const opacityValue = val >= barHeight ? 1 : 0;
        return {
            opacity: withTiming(opacityValue, {duration}),
        };
    }, [heightOffset, isLargeTitle, hasSearch]);

    const containerAnimatedStyle = useAnimatedStyle(
        () => ({
            height: defaultHeight,
            paddingTop: insets.top,
        }),
        [defaultHeight, lockValue]
    );

    const containerStyle = useMemo(
        () => [styles.container, containerAnimatedStyle],
        [styles, containerAnimatedStyle]
    );

    const additionalTitleStyle = useMemo(
        () => ({
            marginLeft: Platform.select({android: showBackButton && !leftComponent ? 20 : 0}),
        }),
        [leftComponent, showBackButton]
    );

    return (
        <Animated.View style={containerStyle}>
            {showBackButton && (
                <Animated.View style={styles.leftContainer}>
                    <TouchableWithFeedback
                        borderlessRipple
                        onPress={onBackPress}
                        rippleRadius={20}
                        type={Platform.select({android: 'native', default: 'opacity'})}
                        hitSlop={hitSlop}>
                        <Animated.View style={styles.leftAction}>
                            <ArrowLeftIcon fill={theme.arrow} width={28} height={28} />
                            {leftComponent}
                        </Animated.View>
                    </TouchableWithFeedback>
                </Animated.View>
            )}
            <Animated.View style={[styles.titleContainer, additionalTitleStyle]}>
                <TouchableWithFeedback
                    disabled={!onTitlePress}
                    onPress={onTitlePress}
                    type="opacity">
                    <View style={styles.centered}>
                        {!hasSearch && (
                            <Animated.Text
                                ellipsizeMode="tail"
                                numberOfLines={1}
                                style={[styles.title, opacity]}
                                testID="navigation.header.title">
                                {title}
                            </Animated.Text>
                        )}
                        {!isLargeTitle && Boolean(subtitle || subtitleCompanion) && (
                            <View style={styles.subtitleContainer}>
                                <Text
                                    ellipsizeMode="tail"
                                    numberOfLines={1}
                                    style={styles.subtitle}
                                    testID="navigation.header.subtitle">
                                    {subtitle}
                                </Text>
                                {subtitleCompanion}
                            </View>
                        )}
                    </View>
                </TouchableWithFeedback>
            </Animated.View>
            <Animated.View style={styles.rightContainer}>
                {Boolean(rightButtons?.length) &&
                    rightButtons?.map((r, i) => (
                        <TouchableWithFeedback
                            key={`key_${r.iconRightComponent}`}
                            borderlessRipple={r.borderless === undefined ? true : r.borderless}
                            hitSlop={rightButtonHitSlop}
                            onPress={r.onPress}
                            rippleRadius={r.rippleRadius || 20}
                            type={
                                r.buttonType ||
                                Platform.select({android: 'native', default: 'opacity'})
                            }
                            style={i > 0 && styles.rightIcon}
                            testID={r.testID}>
                            {r.iconRightComponent && r.iconRightComponent}
                        </TouchableWithFeedback>
                    ))}
            </Animated.View>
        </Animated.View>
    );
};

export default React.memo(Header);
