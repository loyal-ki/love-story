import React, {useMemo} from 'react';
import {useIntl} from 'react-intl';
import {Button} from 'react-native';
import {Edge} from 'react-native-safe-area-context';

import FreezeScreen from '@app/components/freeze';
import {Screen} from '@app/components/screen';
import {Screens} from '@app/constants';
import {useTheme} from '@app/context/theme';
import {useDefaultHeaderHeight} from '@app/hooks/header';
import {onNavigationToScreen} from '@app/navigation/navigation';
import {makeStyleSheetFromTheme} from '@app/utils';

import type {BaseScreens} from '@typings/screens/navigation';

const edges: Edge[] = ['left', 'right', 'bottom'];

const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) => ({
    flex: {
        flex: 1,
    },
    accessory: {
        height: 48,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#F8F8F8',
        paddingHorizontal: 8,
    },
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    input: {
        color: theme.text,
        flex: 1,
        maxHeight: 100,
        paddingBottom: 0,
        paddingTop: 0,
    },
}));

export interface ChatScreenProps {
    componentId: BaseScreens;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({componentId}) => {
    const intl = useIntl();

    const {formatMessage} = intl;

    const {theme} = useTheme();

    const styles = getStyleSheet(theme);

    const defaultHeight = useDefaultHeaderHeight();

    const containerStyle = useMemo(() => {
        const marginTop = defaultHeight;
        return {flex: 1, marginTop, backgroundColor: theme.background};
    }, [defaultHeight, theme.background]);

    const contextStyle = useMemo(
        () => ({
            top: defaultHeight,
        }),
        [defaultHeight]
    );

    return (
        <FreezeScreen>
            <Screen
                title={formatMessage({id: 'settings.page_title'}).toUpperCase()}
                theme={theme}
                showEdgesBottom={false}
                showBackButton={false}
                defaultHeight={defaultHeight}
                componentId={componentId}>
                <Button
                    title="Navigation to Message"
                    color={theme.primary}
                    onPress={async () => {
                        await onNavigationToScreen({screen: Screens.MESSAGE, title: 'Message'});
                    }}
                />
            </Screen>
        </FreezeScreen>
    );
};
