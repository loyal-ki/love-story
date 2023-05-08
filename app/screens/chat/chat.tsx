import React, {useMemo} from 'react';
import {TabView, SceneMap} from 'react-native-tab-view';

import {BlankSpacer, Spacing16} from '@app/components/alias';
import {ConnectionBanner} from '@app/components/connection-banner/connection_banner';
import FreezeScreen from '@app/components/freeze';
import {Icon, IconNameEnum} from '@app/components/icon';
import {Screen} from '@app/components/screen';
import {SearchInput} from '@app/components/search-input';

import {useViewModel} from './chat.view-model';
import {TopBarItem} from './components/top-bar-item';
import {FriendListActive} from './friend-list-chat/active/friend-list-active';
import {FriendListArchived} from './friend-list-chat/archived/friend-list-archived';

import type {BaseScreens} from '@typings/screens/navigation';

export interface ChatScreenProps {
    componentId: BaseScreens;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({componentId}) => {
    const {theme, defaultHeight, layout, index, setIndex, formatMessage} = useViewModel();

    const routes = useMemo(
        () => [
            {key: 'friendListActive', title: formatMessage({id: 'chat.tab_active_title'})},
            {key: 'friendListArchived', title: formatMessage({id: 'chat.tab_archived_title'})},
        ],
        [formatMessage]
    );

    const renderScene = useMemo(
        () =>
            SceneMap({
                friendListActive: FriendListActive,
                friendListArchived: FriendListArchived,
            }),
        []
    );

    return (
        <FreezeScreen>
            <Screen
                title={formatMessage({id: 'chat.page_title'}).toUpperCase()}
                theme={theme}
                leftComponent={
                    <Icon name={IconNameEnum.MenuIcon} size={32} color={theme.primary} />
                }
                showEdgesBottom={false}
                showBackButton={false}
                defaultHeight={defaultHeight}
                componentId={componentId}>
                <ConnectionBanner />

                <BlankSpacer height={Spacing16} />

                <SearchInput theme={theme} placeholder={formatMessage({id: 'chat.search_label'})} />

                <TabView
                    navigationState={{index, routes}}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    renderTabBar={props => <TopBarItem theme={theme} propsTopBar={props} />}
                    initialLayout={{width: layout.width}}
                />
            </Screen>
        </FreezeScreen>
    );
};
