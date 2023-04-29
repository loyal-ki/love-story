import {FlashList} from '@shopify/flash-list';
import React, {useState} from 'react';
import {useIntl} from 'react-intl';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import {Edge} from 'react-native-safe-area-context';

import {KeyboardAccessoryView} from '@app/components/accessory';
import {Message} from '@app/components/message/message';
import {Screen} from '@app/components/screen';
import {INPUT_HEIGHT} from '@app/constants/view';
import {useTheme} from '@app/context/theme';
import {useDefaultHeaderHeight, useMemoizedCallback} from '@app/hooks';
import {MessageType} from '@app/models/message/message';
import {messageList} from '@app/models/mock/messages';
import {user1} from '@app/models/mock/users';
import {changeOpacity, makeStyleSheetFromTheme} from '@app/utils';

import type {BaseScreens} from '@typings/screens/navigation';

import SendIcon from '@assets/svg/send.svg';

const edges: Edge[] = ['left', 'right', 'bottom'];

const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        flex: {
            flex: 1,
        },
        accessory: {
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 24,
            minHeight: INPUT_HEIGHT,
            alignSelf: 'center',
            backgroundColor: theme.primary,
        },
        container: {
            flex: 1,
            backgroundColor: theme.primary,
        },
        input: {
            color: theme.selectedIcon,
            backgroundColor: theme.primary,
            flex: 1,
            maxHeight: 100,
            paddingBottom: 12,
            paddingTop: 12,
            fontSize: 16,
            fontWeight: '500',
            lineHeight: 24,
        },
        sendButton: {
            marginLeft: 16,
        },
    })
);

export interface MessageScreenProps {
    componentId: BaseScreens;
}

export const MessageScreen: React.FC<MessageScreenProps> = ({componentId}) => {
    const intl = useIntl();
    const {formatMessage} = intl;
    const {theme} = useTheme();
    const styles = getStyleSheet(theme);
    const defaultHeight = useDefaultHeaderHeight();

    const [messages, setMessages] = useState(messageList as MessageType.DerivedText[]);

    const renderListEmptyComponent = useMemoizedCallback(() => <View />, []);

    const renderListFooterComponent = useMemoizedCallback(() => <View />, []);

    const handleEndReached = useMemoizedCallback(() => {}, []);

    const renderItem = useMemoizedCallback(
        ({item, index}) => {
            // return <Text>{item.text}</Text>;
            return <Message theme={theme} message={item} currentUser={user1} />;
        },
        [theme]
    );

    const renderListMessageScrollable = useMemoizedCallback(() => {
        return (
            <FlashList
                data={messages}
                renderItem={renderItem}
                estimatedItemSize={200}
                ListHeaderComponent={<View />}
                ListEmptyComponent={renderListEmptyComponent}
                ListFooterComponent={renderListFooterComponent}
                keyboardDismissMode="interactive"
                automaticallyAdjustContentInsets={false}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentInsetAdjustmentBehavior="never"
                maintainVisibleContentPosition={{
                    minIndexForVisible: 0,
                    autoscrollToTopThreshold: 100,
                }}
                inverted
                onEndReached={handleEndReached}
                automaticallyAdjustKeyboardInsets={false}
                onEndReachedThreshold={0.75}
            />
        );
    }, [
        handleEndReached,
        messages,
        renderItem,
        renderListEmptyComponent,
        renderListFooterComponent,
    ]);

    return (
        <Screen
            title={formatMessage({id: 'chat.page_title'}).toUpperCase()}
            theme={theme}
            showBackButton
            defaultHeight={defaultHeight}
            componentId={componentId}>
            <KeyboardAccessoryView
                renderScrollable={renderListMessageScrollable}
                defaultHeight={defaultHeight}
                contentOffsetKeyboardOpened={16}>
                <View style={styles.accessory}>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid="transparent"
                        multiline
                        autoCorrect={false}
                        spellCheck={false}
                        selectionColor={theme.textMessage}
                        placeholderTextColor={changeOpacity(theme.unSelectedIcon, 0.8)}
                        placeholder={formatMessage({id: 'message.input_text_placeholder'})}
                    />
                    <TouchableOpacity onPress={() => {}} style={styles.sendButton}>
                        <SendIcon width={24} height={24} stroke={theme.selectedIcon} />
                    </TouchableOpacity>
                </View>
            </KeyboardAccessoryView>
        </Screen>
    );
};
