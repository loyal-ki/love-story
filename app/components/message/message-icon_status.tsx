import React from 'react';
import {View, StyleSheet} from 'react-native';

import {MessageType} from '@app/models/message/message';
import {makeStyleSheetFromTheme} from '@app/utils';

import ErrorIcon from '@assets/svg/error.svg';
import SeenIcon from '@assets/svg/seen.svg';
import SendingIcon from '@assets/svg/sending.svg';
import SentIcon from '@assets/svg/sent.svg';

const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) =>
    StyleSheet.create({
        container: {
            alignItems: 'center',
            height: 16,
            justifyContent: 'center',
            paddingHorizontal: 4,
            marginHorizontal: 4,
            width: 16,
        },
    })
);

export interface MessageIconStatusProps {
    theme: Theme;
    showStatus: boolean;
    status?: MessageType.Any['status'];
    isCurrentUser: boolean;
}
export const MessageIconStatus = React.memo(
    ({theme, showStatus, status, isCurrentUser}: MessageIconStatusProps) => {
        const styles = getStyleSheet(theme);
        let statusIcon: React.ReactNode | null = null;

        if (showStatus) {
            switch (status) {
                case 'delivered':
                case 'sent':
                    statusIcon = <SentIcon width={20} height={20} stroke={theme.primary} />;
                    break;
                case 'error':
                    statusIcon = <ErrorIcon width={20} height={20} stroke={theme.primary} />;
                    break;
                case 'seen':
                    statusIcon = <SeenIcon width={20} height={20} stroke={theme.primary} />;
                    break;
                case 'sending':
                    statusIcon = <SendingIcon width={20} height={20} stroke={theme.primary} />;
                    break;
                default:
                    break;
            }
        }

        return isCurrentUser ? (
            <View style={styles.container} testID="StatusIconContainer">
                {statusIcon}
            </View>
        ) : null;
    }
);

MessageIconStatus.displayName = 'MessageIconStatus';
