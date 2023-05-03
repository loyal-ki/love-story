import {TouchableOpacity} from '@gorhom/bottom-sheet';
import React, {FC} from 'react';
import {Text, View} from 'react-native';

import {conditionalStyle, isDefined} from '@app/utils';
import {Icon} from '@components/icon';

import {ButtonSharedProps} from './button-shared.props';
import {ButtonStyleConfig} from './button-style.config';
import {getButtonStyleSheet} from './button.styles';

interface Props extends ButtonSharedProps {
    styleConfig: ButtonStyleConfig;
    isFullWidth?: boolean;
    theme: Theme;
}

export const Button: FC<Props> = ({
    title,
    iconName,
    disabled = false,
    styleConfig,

    isFullWidth = false,
    theme,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,

    onPress,

    testID,
    testIDProperties,
}) => {
    const {
        containerStyle,
        titleStyle,
        iconStyle,
        activeColorConfig,
        disabledColorConfig = activeColorConfig,
    } = styleConfig;

    const {
        titleColor,
        iconColor = titleColor,
        backgroundColor,
        borderColor = backgroundColor,
    } = disabled ? disabledColorConfig : activeColorConfig;

    const styles = getButtonStyleSheet(theme);

    const handlePress = () => {
        return onPress?.();
    };

    return (
        <View style={conditionalStyle(isFullWidth, styles.container)}>
            <TouchableOpacity
                disabled={disabled}
                style={[
                    styles.touchableOpacity,
                    containerStyle,
                    {backgroundColor, borderColor},
                    {marginTop, marginRight, marginBottom, marginLeft},
                ]}
                onPress={handlePress}>
                {isDefined(iconName) && (
                    <Icon
                        name={iconName}
                        size={iconStyle?.size}
                        color={iconColor}
                        {...(isDefined(title) && {style: {marginRight: iconStyle?.marginRight}})}
                    />
                )}

                <Text style={[titleStyle, {color: titleColor}]}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
};
