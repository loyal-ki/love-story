import React, {useEffect, useState} from 'react';
import {DeviceEventEmitter, TouchableOpacity, View, useWindowDimensions} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// eslint-disable-next-line import/no-extraneous-dependencies
import {Shadow} from 'react-native-shadow-2';

import {Events, Screens, Navigation as NavigationConstants} from '@app/constants';
import {BOTTOM_TAB_HEIGHT, BOTTOM_TAB_ICON_SIZE} from '@app/constants/view';
import NavigationHandler from '@app/navigation/navigation.handler';
import {changeOpacity, makeStyleSheetFromTheme} from '@app/utils';

import StoryIcon from '@assets/svg/story.svg';
import SettingIcon from '@assets/svg/setting.svg';

import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';

const shadowSides = {top: true, bottom: false, end: false, start: false};
const shadowOffset: [x: number | string, y: number | string] = [0, -0.5];

type Props = {
    isFocused: boolean;
    theme: Theme;
};

const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) => ({
    container: {
        backgroundColor: '#ffffff',
        alignContent: 'center',
        flexDirection: 'row',
        height: BOTTOM_TAB_HEIGHT,
        justifyContent: 'center',
    },
    item: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    separator: {
        borderTopColor: changeOpacity('##3f4350', 0.08),
    },
    slider: {
        backgroundColor: '#1c58d9',
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        width: 56,
        height: 4,
    },
    sliderContainer: {
        height: 4,
        position: 'absolute',
        top: 0,
        left: 10,
        alignItems: 'center',
    },
    shadowBorder: {
        borderRadius: 6,
    },
}));

const Story = ({isFocused, theme}: Props) => {
    return (
        <View>
            <StoryIcon
                width={BOTTOM_TAB_ICON_SIZE}
                height={BOTTOM_TAB_ICON_SIZE}
                stroke={isFocused ? '#1C58D9' : changeOpacity('#3f4350', 0.48)}
            />
        </View>
    );
};

const Settings = ({isFocused, theme}: Props) => {
    return (
        <View>
            <SettingIcon
                width={BOTTOM_TAB_ICON_SIZE}
                height={BOTTOM_TAB_ICON_SIZE}
                stroke={isFocused ? '#1C58D9' : changeOpacity('#3f4350', 0.48)}
            />
        </View>
    );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TabComponents: Record<string, any> = {
    Story,
    Settings,
};

const TabBar = ({state, descriptors, navigation, theme}: BottomTabBarProps & {theme: Theme}) => {
    const [visible, setVisible] = useState<boolean | undefined>();
    const {width} = useWindowDimensions();
    const tabWidth = width / state.routes.length;
    const safeareaInsets = useSafeAreaInsets();
    const style = getStyleSheet(theme);

    useEffect(() => {
        const event = DeviceEventEmitter.addListener(Events.TAB_BAR_VISIBLE, show => {
            setVisible(show);
        });

        return () => event.remove();
    }, []);

    useEffect(() => {
        const listner = DeviceEventEmitter.addListener(NavigationConstants.NAVIGATION_HOME, () => {
            NavigationHandler.setVisibleTap(Screens.HOME);
            navigation.navigate(Screens.HOME);
        });

        return () => listner.remove();
    });

    const transform = useAnimatedStyle(() => {
        const translateX = withTiming(state.index * tabWidth, {duration: 150});
        return {
            transform: [{translateX}],
        };
    }, [state.index, tabWidth]);

    const animatedStyle = useAnimatedStyle(() => {
        if (visible === undefined) {
            return {transform: [{translateY: -safeareaInsets.bottom}]};
        }

        const height = visible
            ? withTiming(-safeareaInsets.bottom, {duration: 200})
            : withTiming(52 + safeareaInsets.bottom, {duration: 150});
        return {
            transform: [{translateY: height}],
        };
    }, [visible, safeareaInsets.bottom]);

    return (
        <Animated.View style={[style.container, style.separator, animatedStyle]}>
            <Shadow
                startColor="rgba(61, 60, 64, 0.08)"
                distance={4}
                offset={shadowOffset}
                style={{
                    position: 'absolute',
                    borderRadius: 6,
                    width,
                }}
                sides={shadowSides}
            />
            <Animated.View style={[style.sliderContainer, {width: tabWidth - 20}, transform]}>
                <View style={style.slider} />
            </Animated.View>

            {state.routes.map((route, index) => {
                const {options} = descriptors[route.key];

                const isFocused = state.index === index;

                const onPress = () => {
                    const lastTab = state.history[state.history.length - 1];
                    const lastIndex = state.routes.findIndex(r => r.key === lastTab.key);
                    const direction = lastIndex < index ? 'right' : 'left';
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    DeviceEventEmitter.emit('tabPress');
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate({params: {direction}, name: route.name, merge: false});
                        NavigationHandler.setVisibleTap(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                const renderOption = () => {
                    const Component = TabComponents[route.name];
                    const props = {isFocused, theme};
                    if (Component) {
                        return <Component {...props} />;
                    }

                    return null;
                };

                return (
                    <TouchableOpacity
                        key={route.name}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? {selected: true} : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={style.item}>
                        {renderOption()}
                    </TouchableOpacity>
                );
            })}
        </Animated.View>
    );
};

export default TabBar;
