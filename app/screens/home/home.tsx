import {BottomTabBarProps, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {enableFreeze, enableScreens} from 'react-native-screens';

import {Screens} from '@app/constants';
import {useTheme} from '@app/context/theme';
import {SettingsScreen} from '@screens/settings';
import {StoryScreen} from '@screens/story';

import { ChatScreen } from '../chat';

import TabBar from './tab_bar';

import type {BaseScreens} from '@typings/screens/navigation';

enableFreeze(true);

if (Platform.OS === 'ios') {
    enableScreens(false);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
});

export interface HomeScreenProps {
    componentId: BaseScreens;
}

const Tab = createBottomTabNavigator();

export const HomeScreen: React.FC<HomeScreenProps> = ({componentId}) => {
    const {theme} = useTheme();

    return (
        <NavigationContainer
            theme={{
                dark: false,
                colors: {
                    primary: theme.primary,
                    background: 'transparent',
                    card: theme.primary,
                    text: theme.background,
                    border: theme.background,
                    notification: theme.background,
                },
            }}>
            <Tab.Navigator
                screenOptions={{headerShown: false, unmountOnBlur: false, lazy: true}}
                backBehavior="none"
                // eslint-disable-next-line react/no-unstable-nested-components
                tabBar={(tabProps: BottomTabBarProps) => <TabBar {...tabProps} theme={theme} />}
                >
                <Tab.Screen
                    name={Screens.STORY}
                    component={StoryScreen}
                    options={{freezeOnBlur: true, lazy: true}}
                />
                <Tab.Screen
                    name={Screens.CHAT}
                    component={ChatScreen}
                    options={{freezeOnBlur: true, lazy: true}}
                />
                <Tab.Screen
                    name={Screens.SETTINGS}
                    component={SettingsScreen}
                    options={{
                        freezeOnBlur: true,
                        lazy: true,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};
