import BottomSheetM, {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetFooterProps,
} from '@gorhom/bottom-sheet';
import React, {ReactNode, useCallback, useEffect, useMemo, useRef} from 'react';
import {
    DeviceEventEmitter,
    Handle,
    InteractionManager,
    Keyboard,
    StyleProp,
    View,
    ViewStyle,
} from 'react-native';
import {WithSpringConfig} from 'react-native-reanimated';

import {Events} from '@app/constants';
import {useTheme} from '@app/context/theme';
import {useAndroidHardwareBackHandler} from '@app/hooks';
import useNavButtonPressed from '@app/hooks/navigation_button_pressed';
import {hapticFeedback, makeStyleSheetFromTheme} from '@app/utils';

import Indicator from './indicator';

import {dismissModalIfShowing} from '@navigation/navigation';
import {BaseScreens} from '@typings/screens/navigation';

export interface BottomSheetProps {
    closeButtonId?: string;
    componentId: BaseScreens;
    contentStyle?: StyleProp<ViewStyle>;
    initialSnapIndex?: number;
    footerComponent?: React.FC<BottomSheetFooterProps>;
    renderContent: () => ReactNode;
    snapPoints?: Array<string | number>;
    testID?: string;
}

export const animatedConfig: Omit<WithSpringConfig, 'velocity'> = {
    damping: 50,
    mass: 0.4,
    stiffness: 121.6,
    overshootClamping: true,
    restSpeedThreshold: 0.1,
    restDisplacementThreshold: 0.3,
};

export const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) => {
    return {
        bottomSheet: {
            backgroundColor: theme.background,
            borderTopStartRadius: 36,
            borderTopEndRadius: 36,
            shadowOffset: {
                width: 0,
                height: 8,
            },
            shadowOpacity: 0.12,
            shadowRadius: 36,
            shadowColor: '#000',
            elevation: 36,
        },
        bottomSheetBackground: {
            backgroundColor: theme.background,
        },
        content: {
            flex: 1,
            paddingHorizontal: 32,
        },
        contentTablet: {},
        separator: {
            height: 1,
            borderTopWidth: 1,
        },
    };
});

export const BottomSheet: React.FC<BottomSheetProps> = ({
    closeButtonId,
    componentId,
    contentStyle,
    initialSnapIndex = 1,
    footerComponent,
    renderContent,
    snapPoints = [1, '50%', '80%'],
    testID,
}) => {
    const {theme} = useTheme();
    const styles = getStyleSheet(theme);
    const sheetRef = useRef<BottomSheetM>(null);
    const interaction = useRef<Handle>();
    const timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        interaction.current = InteractionManager.createInteractionHandle();
    }, []);

    const bottomSheetBackgroundStyle = useMemo(() => [styles.bottomSheetBackground], [styles]);

    const close = useCallback(() => {
        dismissModalIfShowing({componentId});
    }, [componentId]);

    useEffect(() => {
        const listener = DeviceEventEmitter.addListener(Events.CLOSE_BOTTOM_SHEET, () => {
            if (sheetRef.current) {
                sheetRef.current.close();
            } else {
                close();
            }
        });

        return () => listener.remove();
    }, [close]);

    const handleAnimationStart = useCallback(() => {
        if (!interaction.current) {
            interaction.current = InteractionManager.createInteractionHandle();
        }
    }, []);

    const handleClose = useCallback(() => {
        if (sheetRef.current) {
            sheetRef.current.close();
        } else {
            close();
        }
    }, [close]);

    const handleChange = useCallback(
        (index: number) => {
            timeoutRef.current = setTimeout(() => {
                if (interaction.current) {
                    InteractionManager.clearInteractionHandle(interaction.current);
                    interaction.current = undefined;
                }
            });

            if (index <= 0) {
                close();
            }
        },
        [close]
    );

    useAndroidHardwareBackHandler(componentId, handleClose);

    useNavButtonPressed(closeButtonId || '', componentId, close, [close]);

    useEffect(() => {
        hapticFeedback();
        Keyboard.dismiss();

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            if (interaction.current) {
                InteractionManager.clearInteractionHandle(interaction.current);
            }
        };
    }, []);

    const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => {
        return (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={0}
                appearsOnIndex={1}
                opacity={0.6}
            />
        );
    }, []);

    const renderContainerContent = () => (
        <View style={[styles.content, contentStyle]} testID={`${testID}.screen`}>
            {renderContent()}
        </View>
    );

    return (
        <BottomSheetM
            ref={sheetRef}
            index={initialSnapIndex}
            snapPoints={snapPoints}
            animateOnMount
            backdropComponent={renderBackdrop}
            onAnimate={handleAnimationStart}
            onChange={handleChange}
            animationConfigs={animatedConfig}
            handleComponent={Indicator}
            style={styles.bottomSheet}
            backgroundStyle={bottomSheetBackgroundStyle}
            footerComponent={footerComponent}
            keyboardBehavior="extend"
            keyboardBlurBehavior="restore"
            onClose={close}>
            {renderContainerContent()}
        </BottomSheetM>
    );
};
