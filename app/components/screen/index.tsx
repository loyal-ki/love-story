import * as React from 'react';
import {useMemo} from 'react';
import {Keyboard, View} from 'react-native';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';

import {useMemoizedCallback} from '@app/hooks';
import {popScreen} from '@app/navigation/navigation';
import {makeStyleSheetFromTheme} from '@app/utils';

import NavigationHeader from '../header';
import RoundedHeaderContext from '../rounded_header_context';

import {BaseScreens} from '@typings/screens/navigation';

interface Props {
    title: string;
    theme: Theme;
    children?: React.ReactNode;
    componentId: BaseScreens;
    defaultHeight: number;
    showBackButton?: boolean;
    showEdgesBottom?: boolean;
}
const edgesHorizontal: Edge[] = ['left', 'right'];
const edgesBottom: Edge[] = ['bottom'];

const getStyleSheet = makeStyleSheetFromTheme(theme => {
    return {
        flex: {
            flex: 1,
        },
        flexBottomStatusBar: {flex: 0, backgroundColor: theme.primary},
    };
});

export const Screen = React.memo(
    ({
        children,
        componentId,
        title,
        theme,
        defaultHeight,
        showBackButton = false,
        showEdgesBottom = true,
    }: Props) => {
        const styles = getStyleSheet(theme);

        const contextStyle = useMemo(
            () => ({
                top: defaultHeight,
            }),
            [defaultHeight]
        );

        const containerStyle = useMemo(() => {
            const marginTop = defaultHeight;
            return {flex: 1, marginTop, backgroundColor: theme.background};
        }, [defaultHeight, theme.background]);

        const onBackPress = useMemoizedCallback(() => {
            Keyboard.dismiss();
            popScreen(componentId);
        }, [componentId]);

        return (
            <>
                <SafeAreaView style={styles.flex} edges={edgesHorizontal}>
                    <NavigationHeader
                        showBackButton={showBackButton}
                        onBackPress={onBackPress}
                        title={title}
                        hasSearch={false}
                    />
                    <View style={contextStyle}>
                        <RoundedHeaderContext />
                    </View>
                    <View style={containerStyle}>{children}</View>
                </SafeAreaView>
                {showEdgesBottom && (
                    <SafeAreaView edges={edgesBottom} style={styles.flexBottomStatusBar} />
                )}
            </>
        );
    }
);

Screen.displayName = 'BaseScreen';
