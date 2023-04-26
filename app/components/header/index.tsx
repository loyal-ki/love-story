import React, {forwardRef} from 'react';
import Animated, {useAnimatedStyle, useDerivedValue} from 'react-native-reanimated';

import {useTheme} from '@app/context/theme';
import useHeaderHeight, {MAX_OVERSCROLL} from '@app/hooks/header';
import {makeStyleSheetFromTheme} from '@utils/theme';

import Header, {type HeaderRightButton} from './header';

type Props = {
    hasSearch?: boolean;
    isLargeTitle?: boolean;
    leftComponent?: React.ReactElement;
    onBackPress?: () => void;
    onTitlePress?: () => void;
    rightButtons?: HeaderRightButton[];
    scrollValue?: Animated.SharedValue<number>;
    lockValue?: Animated.SharedValue<number | null>;
    hideHeader?: () => void;
    showBackButton?: boolean;
    subtitle?: string;
    subtitleCompanion?: React.ReactElement;
    title?: string;
};

const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) => ({
    container: {
        backgroundColor: theme.background,
        position: 'absolute',
        width: '100%',
        zIndex: 10,
    },
}));

const NavigationHeader = forwardRef<Props, Props>(
    (
        {
            hasSearch = false,
            isLargeTitle = false,
            leftComponent,
            onBackPress,
            onTitlePress,
            rightButtons,
            scrollValue,
            lockValue,
            showBackButton,
            subtitle,
            subtitleCompanion,
            title = '',
            hideHeader,
        }: Props,
        ref
    ) => {
        const {theme} = useTheme();
        const styles = getStyleSheet(theme);

        const {largeHeight, defaultHeight, headerOffset} = useHeaderHeight();

        const containerHeight = useAnimatedStyle(() => {
            const minHeight = defaultHeight;
            const value = -(scrollValue?.value || 0);
            const calculatedHeight = (isLargeTitle ? largeHeight : defaultHeight) + value;
            const height = lockValue?.value ? lockValue.value : calculatedHeight;
            return {
                height: Math.max(height, minHeight),
                minHeight,
                maxHeight: largeHeight + MAX_OVERSCROLL,
            };
        });

        const heightOffset = useDerivedValue(
            () => (lockValue?.value ? lockValue.value : headerOffset),
            [lockValue, headerOffset]
        );

        return (
            <Animated.View style={[styles.container, containerHeight]}>
                <Header
                    defaultHeight={defaultHeight}
                    hasSearch={hasSearch}
                    isLargeTitle={isLargeTitle}
                    heightOffset={heightOffset.value}
                    leftComponent={leftComponent}
                    onBackPress={onBackPress}
                    onTitlePress={onTitlePress}
                    rightButtons={rightButtons}
                    lockValue={lockValue}
                    scrollValue={scrollValue}
                    showBackButton={showBackButton}
                    subtitle={subtitle}
                    subtitleCompanion={subtitleCompanion}
                    theme={theme}
                    title={title}
                />
            </Animated.View>
        );
    }
);

NavigationHeader.displayName = 'NavHeader';
export default NavigationHeader;
