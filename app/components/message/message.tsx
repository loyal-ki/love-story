/* eslint-disable react-hooks/rules-of-hooks */
import React, {useMemo} from 'react';
import {Pressable, StyleSheet, Text, View, ViewStyle} from 'react-native';

import {useMemoizedCallback} from '@app/hooks';
import {UserModel} from '@app/models';
import {MessageType} from '@app/models/message/message';
import {makeStyleSheetFromTheme} from '@app/utils';

import {MessageIconStatus} from './message-icon_status';
import {MessageImage} from './message-image';
import {MessageText} from './message-text';

const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        pressable: {},
        dateHeader: {
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 32,
            marginTop: 16,
        },
        dateHeaderText: {},
    })
);

export interface MessageFunctionalProps {
    onMessageLongPress?: (message: MessageType.Any) => void | undefined;
    onMessagePress?: (message: MessageType.Any) => void | undefined;
    renderBubble?: (payload: {
        child: React.ReactNode;
        message: MessageType.Any;
        messageWidth: number;
        nextMessageInGroup: boolean;
    }) => React.ReactNode;
}

export interface MessageProps extends MessageFunctionalProps {
    theme: Theme;
    message: MessageType.DerivedAny;
    currentUser: UserModel;
}

export const Message = React.memo(
    ({
        theme,
        message,
        onMessageLongPress,
        onMessagePress,
        renderBubble,
        currentUser,
    }: MessageProps) => {
        const styles = getStyleSheet(theme);

        const isCurrentUser =
            message.type !== 'dateHeader' && currentUser?.id === message.author.id;

        if (message.type === 'dateHeader') {
            return (
                <View style={styles.dateHeader}>
                    <Text style={styles.dateHeaderText}>{message.text}</Text>
                </View>
            );
        }

        const renderMessage = useMemoizedCallback(() => {
            switch (message.type) {
                case 'text':
                    return (
                        <MessageText
                            text={message.text}
                            theme={theme}
                            isCurrentUser={isCurrentUser}
                        />
                    );
                case 'image':
                    return (
                        <MessageImage
                            theme={theme}
                            message={message}
                            isCurrentUser={isCurrentUser}
                        />
                    );
                default:
                    return null;
            }
        }, [isCurrentUser, message, theme]);

        const containerContextStyle = useMemo(() => {
            const alignItems = 'flex-end';
            const alignSelf = isCurrentUser ? 'flex-end' : 'flex-start';
            const justifyContent = !isCurrentUser ? 'flex-end' : 'flex-start';
            const flex = 1;
            const flexDirection = 'row';
            const marginBottom = 4 + message.offset;
            const marginLeft = 20;

            return {
                alignItems,
                alignSelf,
                justifyContent,
                flex,
                flexDirection,
                marginBottom,
                marginLeft,
            } as ViewStyle;
        }, [isCurrentUser, message.offset]);

        const contentContainer = useMemo(() => {
            const backgroundColor = isCurrentUser ? theme.primary : theme.primarySecondary;
            const borderBottomLeftRadius = isCurrentUser ? 20 : 0;
            const borderBottomRightRadius = isCurrentUser ? 0 : 20;
            const borderRadius = 20;

            return {
                backgroundColor,
                borderBottomLeftRadius,
                borderBottomRightRadius,
                borderRadius,
                borderColor: 'transparent',
            };
        }, [isCurrentUser, theme]);

        const renderBubbleContainer = useMemoizedCallback(() => {
            return <View style={contentContainer}>{renderMessage()}</View>;
        }, [contentContainer, renderMessage]);

        const onMemoizedMessageLongPress = useMemoizedCallback(() => {}, []);

        const onMemoizedMessagePress = useMemoizedCallback(() => {}, []);

        return (
            <View style={containerContextStyle}>
                <Pressable
                    onLongPress={onMemoizedMessageLongPress}
                    onPress={onMemoizedMessagePress}
                    style={styles.pressable}>
                    {renderBubbleContainer()}
                </Pressable>
                <MessageIconStatus
                    theme={theme}
                    showStatus
                    status={message.status}
                    isCurrentUser={isCurrentUser}
                />
            </View>
        );
    }
);

Message.displayName = 'Message';
