import {FlashList} from '@shopify/flash-list';
import React from 'react';
import {useIntl} from 'react-intl';
import {
    InputAccessoryView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';

import {useTheme} from '@app/context/theme';
import {useMemoizedCallback} from '@app/hooks';
import {changeOpacity, makeStyleSheetFromTheme} from '@app/utils';

import type {BaseScreens} from '@typings/screens/navigation';

import SendIcon from '@assets/svg/send.svg';

const DATA = Array.from(Array(100).keys());

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
            paddingVertical: 20,
            backgroundColor: theme.primary,
        },
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        input: {
            color: theme.selectedIcon,
            flex: 1,
            maxHeight: 100,
            paddingBottom: 0,
            paddingTop: 0,
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

    const renderListEmptyComponent = useMemoizedCallback(() => <View />, []);

    const renderListFooterComponent = useMemoizedCallback(() => <View />, []);

    const handleEndReached = useMemoizedCallback(() => {}, []);

    return (
        <SafeAreaView style={styles.flex} edges={edges}>
            <View style={styles.container}>
                <FlashList
                    data={DATA}
                    renderItem={({item}) => <Text>{item}</Text>}
                    estimatedItemSize={200}
                    ListHeaderComponent={<View />}
                    ListEmptyComponent={renderListEmptyComponent}
                    ListFooterComponent={renderListFooterComponent}
                    keyboardDismissMode="interactive"
                    automaticallyAdjustContentInsets={false}
                    contentInsetAdjustmentBehavior="never"
                    maintainVisibleContentPosition={{
                        minIndexForVisible: 0,
                        autoscrollToTopThreshold: 100,
                    }}
                    inverted
                    onEndReached={handleEndReached}
                    automaticallyAdjustKeyboardInsets
                    onEndReachedThreshold={0.75}
                />
                <InputAccessoryView>
                    <View style={styles.accessory}>
                        <TextInput
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            multiline
                            placeholderTextColor={changeOpacity(theme.unSelectedIcon, 0.8)}
                            placeholder={formatMessage({id: 'message.input_text_placeholder'})}
                        />
                        <TouchableOpacity onPress={() => {}} style={styles.sendButton}>
                            <SendIcon width={24} height={24} stroke={theme.selectedIcon} />
                        </TouchableOpacity>
                    </View>
                </InputAccessoryView>
            </View>
        </SafeAreaView>
    );
};
