/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {Animated, I18nManager, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {NavigationState, Route, SceneRendererProps, TabBar} from 'react-native-tab-view';
import {GetTabWidth} from 'react-native-tab-view/lib/typescript/src/TabBarIndicator';

import {TOP_TAB_HEIGHT} from '@app/constants/view';
import {changeOpacity, makeStyleSheetFromTheme, typography} from '@app/utils';

const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        tabStyle: {
            borderColor: theme.background,
            backgroundColor: theme.background,
            shadowOpacity: 0,
            height: TOP_TAB_HEIGHT,
        },
        labelStyle: {
            ...typography.text16Bold,
        },
        indicator: {
            marginTop: TOP_TAB_HEIGHT + 8,
            backgroundColor: theme.primary,
            width: 4,
            height: 4,
            borderRadius: 10,
        },
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
    })
);

type TopTabProps<T extends Route> = {
    theme: Theme;
    propsTopBar: SceneRendererProps & {navigationState: NavigationState<T>};
};

type IndicatorProps<T extends Route> = {
    navigationState: NavigationState<T>;
    width: string | number;
    style?: StyleProp<ViewStyle>;
    getTabWidth: GetTabWidth;
    gap?: number;
    position?: any;
};

const renderIndicator = <T extends Route>(props: IndicatorProps<T>, theme: Theme) => {
    const styles = getStyleSheet(theme);

    const {position, navigationState, getTabWidth} = props;
    const inputRange = [0, 0.48, 0.49, 0.51, 0.52, 1, 1.48, 1.49, 1.51, 1.52, 2];

    const scale = position.interpolate({
        inputRange,
        outputRange: inputRange.map(x => (Math.trunc(x) === x ? 2 : 0.1)),
    });

    const opacity = position.interpolate({
        inputRange,
        outputRange: inputRange.map(x => {
            const d = x - Math.trunc(x);
            return d === 0.49 || d === 0.51 ? 0 : 1;
        }),
    });

    const translateX = position.interpolate({
        inputRange,
        outputRange: inputRange.map(x => {
            const i = Math.round(x);
            return i * getTabWidth(i) * (I18nManager.isRTL ? -1 : 1);
        }),
    });

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    width: `${100 / navigationState.routes.length}%`,
                    transform: [{translateX}],
                },
            ]}>
            <Animated.View style={[styles.indicator, {opacity, transform: [{scale}]}]} />
        </Animated.View>
    );
};

export const TopBarItem = React.memo(({theme, propsTopBar}: TopTabProps<any>) => {
    const styles = getStyleSheet(theme);

    return (
        <TabBar
            {...propsTopBar}
            style={styles.tabStyle}
            tabStyle={styles.tabStyle}
            activeColor={theme.primary}
            renderIndicator={props => renderIndicator(props, theme)}
            inactiveColor={changeOpacity(theme.primary, 0.5)}
            labelStyle={styles.labelStyle}
        />
    );
});

TopBarItem.displayName = 'TopBarItem';
