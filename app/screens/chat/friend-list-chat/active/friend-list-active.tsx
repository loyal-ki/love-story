import {FlashList, ViewToken} from '@shopify/flash-list';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSharedValue} from 'react-native-reanimated';

import {BlankSpacer, Spacing16} from '@app/components/alias';
import {useTheme} from '@app/context/theme';
import {formatSize, makeStyleSheetFromTheme} from '@app/utils';
import {ConversationItem} from '@screens/chat/friend-list-chat/item/conversation-item';

import {useViewModel} from './friend-list-active.view-model';

const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
    })
);

const data = new Array(50).fill(0).map((_, index) => ({id: index}));

export const FriendListActive: React.FC = () => {
    const viewableItems = useSharedValue<ViewToken[]>([]);

    const viewModel = useViewModel();

    const {theme} = useTheme();

    const styles = getStyleSheet(theme);

    return (
        <View style={styles.container}>
            <BlankSpacer height={formatSize(Spacing16)} />
            <FlashList
                data={data}
                onViewableItemsChanged={({viewableItems: vItems}) => {
                    viewableItems.value = vItems;
                }}
                renderItem={({item}) => {
                    return (
                        <ConversationItem theme={theme} item={item} viewableItems={viewableItems} />
                    );
                }}
                estimatedItemSize={10}
            />
        </View>
    );
};
