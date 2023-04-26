import React, {useCallback, useMemo} from 'react';
import Animated, {
    runOnJS,
    scrollTo,
    useAnimatedRef,
    useAnimatedScrollHandler,
    useDerivedValue,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import type {NativeScrollEvent} from 'react-native';
import {
    DEFAULT_HEADER_HEIGHT,
    LARGE_HEADER_TITLE_HEIGHT,
    SUBTITLE_HEIGHT,
} from '@app/constants/view';

type HeaderScrollContext = {
    dragging?: boolean;
    momentum?: string;
    start?: number;
};

export const MAX_OVERSCROLL = 80;

export const useDefaultHeaderHeight = () => {
    const insets = useSafeAreaInsets();

    const headerHeight = DEFAULT_HEADER_HEIGHT;

    return headerHeight + insets.top;
};

export const useLargeHeaderHeight = () => {
    let largeHeight = useDefaultHeaderHeight();
    largeHeight += LARGE_HEADER_TITLE_HEIGHT;
    largeHeight += SUBTITLE_HEIGHT;
    return largeHeight;
};

export const useHeaderHeight = () => {
    const defaultHeight = useDefaultHeaderHeight();
    const largeHeight = useLargeHeaderHeight();
    const headerOffset = largeHeight - defaultHeight;
    return useMemo(
        () => ({
            defaultHeight,
            largeHeight,
            headerOffset,
        }),
        [defaultHeight, largeHeight]
    );
};

export const useCollapsibleHeader = <T>(
    isLargeTitle: boolean,
    onSnap?: (offset: number) => void
) => {
    const insets = useSafeAreaInsets();
    const animatedRef = useAnimatedRef<Animated.ScrollView>();
    const {largeHeight, defaultHeight, headerOffset} = useHeaderHeight();
    const scrollValue = useSharedValue(0);
    const lockValue = useSharedValue<number | null>(null);
    const autoScroll = useSharedValue(false);
    const snapping = useSharedValue(false);
    const scrollEnabled = useSharedValue(true);

    const headerHeight = useDerivedValue(() => {
        const value = -(scrollValue?.value || 0);
        const heightWithScroll = (isLargeTitle ? largeHeight : defaultHeight) + value;
        let height = Math.max(heightWithScroll, defaultHeight);
        if (value > insets.top) {
            height = Math.min(heightWithScroll, largeHeight + MAX_OVERSCROLL);
        }
        return height;
    });

    function snapIfNeeded(dir: string, offset: number) {
        'worklet';
        if (onSnap && !snapping.value) {
            snapping.value = true;
            if (dir === 'down' && offset < largeHeight) {
                runOnJS(onSnap)(0);
            } else if (dir === 'up' && offset < defaultHeight) {
                runOnJS(onSnap)(headerOffset);
            }
            snapping.value = Boolean(withTiming(0, {duration: 100}));
        }
    }

    const setAutoScroll = (enabled: boolean) => {
        autoScroll.value = enabled;
    };

    const onScroll = useAnimatedScrollHandler(
        {
            onBeginDrag: (e: NativeScrollEvent, ctx: HeaderScrollContext) => {
                ctx.start = e.contentOffset.y;
                ctx.dragging = true;
            },
            onScroll: (e, ctx) => {
                if (!scrollEnabled.value) {
                    scrollTo(animatedRef, 0, headerOffset, false);
                    return;
                }

                if (ctx.dragging || autoScroll.value || snapping.value) {
                    scrollValue.value = e.contentOffset.y;
                } else {
                    // here we want to ensure that the scroll position
                    // always start at 0 if the user has not dragged
                    // the scrollview manually
                    scrollTo(animatedRef, 0, scrollValue.value, false);
                }
            },
            onEndDrag: (e, ctx) => {
                if (ctx.start !== undefined) {
                    const dir = e.contentOffset.y < ctx.start ? 'down' : 'up';
                    const offset = Math.abs(e.contentOffset.y);
                    snapIfNeeded(dir, offset);
                }
            },
            onMomentumBegin: (e, ctx) => {
                ctx.momentum = e.contentOffset.y < (ctx.start || 0) ? 'down' : 'up';
            },
            onMomentumEnd: (e, ctx) => {
                ctx.start = undefined;
                ctx.dragging = false;
                if (ctx.momentum === 'down') {
                    const offset = Math.abs(e.contentOffset.y);

                    if (onSnap && offset < largeHeight) {
                        runOnJS(onSnap)(0);
                    }
                    ctx.momentum = undefined;
                }
            },
        },
        [insets, defaultHeight, largeHeight, animatedRef]
    );

    const hideHeader = useCallback(
        (lock = false) => {
            if (lock) {
                lockValue.value = defaultHeight;
            }

            const offset = headerOffset;
            if (animatedRef?.current && Math.abs(scrollValue?.value || 0) <= insets.top) {
                autoScroll.value = true;
                if ('scrollTo' in animatedRef.current) {
                    animatedRef.current.scrollTo({y: offset, animated: true});
                } else if ('scrollToOffset' in animatedRef.current) {
                    (animatedRef.current as any).scrollToOffset({
                        offset,
                        animated: true,
                    });
                } else {
                    // No scroll for section lists?
                }
            }
        },
        [largeHeight, defaultHeight]
    );

    const unlock = useCallback(() => {
        lockValue.value = null;
    }, []);

    return {
        defaultHeight,
        largeHeight,
        scrollPaddingTop: isLargeTitle ? largeHeight : defaultHeight,
        scrollRef: animatedRef as unknown as React.RefObject<T>,
        scrollValue,
        onScroll,
        hideHeader,
        lockValue,
        unlock,
        headerHeight,
        headerOffset,
        scrollEnabled,
        setAutoScroll,
    };
};

export default useHeaderHeight;
