import React from 'react';
import {StyleSheet, View, ViewToken} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

import {BlankSpacer, Spacing16} from '@app/components/alias';
import {Avatar} from '@app/components/avatar';
import {Label} from '@app/components/label';
// import {UserModel} from '@app/models';
import {formatSize, makeStyleSheetFromTheme, typography} from '@app/utils';

type ConversationItemProps = {
    viewableItems: Animated.SharedValue<ViewToken[]>;
    item: {
        id: number;
        // isReadMessage: boolean;
        // sender: UserModel;
    };
    theme: Theme;
};

const ITEM_SIZE = 100;

const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        itemContainer: {
            height: ITEM_SIZE,
            width: '90%',
            backgroundColor: theme.background,
            alignSelf: 'center',
            borderRadius: 15,
            marginTop: 20,
            shadowColor: theme.black,
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.2,
            elevation: 2,
            paddingHorizontal: formatSize(Spacing16),
            justifyContent: 'center',
        },
        item: {
            flexDirection: 'row',
        },
        itemMessageDirector: {
            flexDirection: 'column',
        },
        name: {
            ...typography.text16Bold,
        },
        unreadMessage: {
            ...typography.text14Bold,
        },
        readMessage: {
            ...typography.text14Regular,
        },
    })
);

export const ConversationItem: React.FC<ConversationItemProps> = React.memo(
    ({item, viewableItems, theme}: ConversationItemProps) => {
        const styles = getStyleSheet(theme);

        const rStyle = useAnimatedStyle(() => {
            const isVisible = Boolean(
                viewableItems.value
                    .filter(val => val.isViewable)
                    .find(viewableItem => viewableItem.item.id === item.id)
            );

            return {
                opacity: withTiming(isVisible ? 1 : 0),
                transform: [
                    {
                        scale: withTiming(isVisible ? 1 : 0.8),
                    },
                ],
            };
        }, []);

        return (
            <Animated.View style={[styles.itemContainer, rStyle]}>
                <View style={styles.item}>
                    <Avatar
                        uri="https://cutewallpaper.org/24/person-icon-png-transparent/person-free-download-and-person-icon-png-png-image-transparent-png-free-download-on-seekpng.png"
                        theme={theme}
                        size={56}
                    />

                    <BlankSpacer width={Spacing16} />
                    <View style={styles.itemMessageDirector}>
                        <Label label="Susan" theme={theme} labelStyle={styles.name} />
                        <Label
                            label="I'm looking forward new app ..."
                            theme={theme}
                            labelStyle={styles.unreadMessage}
                        />
                    </View>
                </View>
            </Animated.View>
        );
    }
);

ConversationItem.displayName = 'ConversationItem';
