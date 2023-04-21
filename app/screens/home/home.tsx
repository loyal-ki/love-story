import {BottomTabBarProps, createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import {enableFreeze, enableScreens} from 'react-native-screens';

import {Screens} from '@app/constants';
import {useTheme} from '@app/context/theme';
import {AccountScreen} from '@screens/account';
import {StoryScreen} from '@screens/story';

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
    const theme = useTheme();

    return (
        <NavigationContainer
            theme={{
                dark: false,
                colors: {
                    primary: '#3f4350',
                    background: 'transparent',
                    card: '#ffffff',
                    text: '#3f4350',
                    border: 'white',
                    notification: '#7ff0f0',
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
                    name={Screens.ACCOUNT}
                    component={AccountScreen}
                    options={{
                        freezeOnBlur: true,
                        lazy: true,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};
