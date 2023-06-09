import React, {useMemo} from 'react';
import {useIntl} from 'react-intl';
import {ScrollView, View} from 'react-native';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';

import FreezeScreen from '@app/components/freeze';
import NavigationHeader from '@app/components/header';
import RoundedHeaderContext from '@app/components/rounded_header_context';
import {useTheme} from '@app/context/theme';
import {useDefaultHeaderHeight} from '@app/hooks/header';
import {makeStyleSheetFromTheme} from '@app/utils';

import type {BaseScreens} from '@typings/screens/navigation';

const edges: Edge[] = ['left', 'right', 'bottom'];

const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) => ({
    flex: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
}));

export interface StoryScreenProps {
    componentId: BaseScreens;
}

export const StoryScreen: React.FC<StoryScreenProps> = ({componentId}) => {
    const intl = useIntl();
    const {formatMessage} = intl;
    const {theme} = useTheme();
    const styles = getStyleSheet(theme);

    const defaultHeight = useDefaultHeaderHeight();

    const containerStyle = useMemo(() => {
        const marginTop = defaultHeight;
        return {flex: 1, marginTop};
    }, [defaultHeight]);

    const contextStyle = useMemo(
        () => ({
            top: defaultHeight,
        }),
        [defaultHeight]
    );

    return (
        <FreezeScreen>
            <SafeAreaView edges={edges} style={styles.flex}>
                <NavigationHeader
                    showBackButton={false}
                    title={formatMessage({id: 'story.page_title'}).toUpperCase()}
                    hasSearch={false}
                />
                <View style={contextStyle}>
                    <RoundedHeaderContext />
                </View>
                <View style={containerStyle}>
                    <ScrollView style={styles.container} />
                </View>
            </SafeAreaView>
        </FreezeScreen>
    );
};
