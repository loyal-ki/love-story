import React, {useCallback, useMemo} from 'react';
import {
    LayoutChangeEvent,
    Platform,
    StyleProp,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import {Switch} from 'react-native-switch';
import Icon from 'react-native-vector-icons/FontAwesome';

import TouchableWithFeedback from '@components/touchable_with_feedback';
import {changeOpacity, makeStyleSheetFromTheme} from '@utils/theme';

import OptionIcon from './option_icon';
import RadioItem, {RadioItemProps} from './radio_item';

import {useTheme} from '@context/theme';

const TouchableOptionTypes = {
    ARROW: 'arrow',
    DEFAULT: 'default',
    RADIO: 'radio',
    REMOVE: 'remove',
    SELECT: 'select',
};

const OptionType = {
    NONE: 'none',
    TOGGLE: 'toggle',
    ...TouchableOptionTypes,
} as const;

// eslint-disable-next-line @typescript-eslint/no-redeclare
type OptionType = (typeof OptionType)[keyof typeof OptionType];

export const ITEM_HEIGHT = 48;

const hitSlop = {top: 11, bottom: 11, left: 11, right: 11};
const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) => {
    return {
        actionContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 16,
        },
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            minHeight: ITEM_HEIGHT,
        },
        destructive: {
            color: '#ff3333',
        },
        description: {
            color: changeOpacity('#3f4350', 0.64),
            marginTop: 2,
        },
        iconContainer: {marginRight: 16},
        infoContainer: {marginRight: 2},
        info: {
            color: changeOpacity('#3f4350', 0.56),
        },
        inlineLabel: {
            flexDirection: 'row',
            flexShrink: 1,
            justifyContent: 'center',
        },
        inlineLabelText: {
            color: '#3f4350',
        },
        inlineDescription: {
            color: '#3f4350',
        },
        label: {
            flexShrink: 1,
            justifyContent: 'center',
        },
        labelContainer: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        labelText: {
            color: '#3f4350',
        },
        removeContainer: {
            flex: 1,
            alignItems: 'flex-end',
            color: '#3f4350',
            marginRight: 20,
        },
        row: {
            flex: 1,
            flexDirection: 'row',
        },
    };
});

export type OptionItemProps = {
    action?:
        | React.Dispatch<React.SetStateAction<string | boolean>>
        | ((value: string | boolean) => void);
    arrowStyle?: StyleProp<ViewStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    description?: string;
    destructive?: boolean;
    icon?: string;
    iconColor?: string;
    info?: string;
    inline?: boolean;
    label: string;
    onRemove?: () => void;
    optionDescriptionTextStyle?: StyleProp<TextStyle>;
    optionLabelTextStyle?: StyleProp<TextStyle>;
    radioItemProps?: Partial<RadioItemProps>;
    selected?: boolean;
    testID?: string;
    type: OptionType;
    value?: string;
    onLayout?: (event: LayoutChangeEvent) => void;
};

const OptionItem = ({
    action,
    arrowStyle,
    containerStyle,
    description,
    destructive,
    icon,
    iconColor,
    info,
    inline = false,
    label,
    onRemove,
    optionDescriptionTextStyle,
    optionLabelTextStyle,
    radioItemProps,
    selected,
    testID = 'optionItem',
    type,
    value,
    onLayout,
}: OptionItemProps) => {
    const theme = useTheme();
    const styles = getStyleSheet(theme);

    const isInLine = inline && Boolean(description);

    const labelStyle = useMemo(() => {
        return isInLine ? styles.inlineLabel : styles.label;
    }, [styles, isInLine]);

    const labelTextStyle = useMemo(() => {
        return [
            isInLine ? styles.inlineLabelText : styles.labelText,
            destructive && styles.destructive,
        ];
    }, [destructive, styles, isInLine]);

    const descriptionTextStyle = useMemo(() => {
        return [
            isInLine ? styles.inlineDescription : styles.description,
            destructive && styles.destructive,
        ];
    }, [destructive, styles, isInLine]);

    let actionComponent;
    let radioComponent;
    if (type === OptionType.SELECT && selected) {
        actionComponent = (
            <Icon color="#1C58D9" name="check" size={24} testID={`${testID}.selected`} />
        );
    } else if (type === OptionType.RADIO) {
        const radioComponentTestId = selected ? `${testID}.selected` : `${testID}.not_selected`;
        radioComponent = (
            <RadioItem
                selected={Boolean(selected)}
                {...radioItemProps}
                testID={radioComponentTestId}
            />
        );
    } else if (type === OptionType.TOGGLE) {
        actionComponent = (
            <Switch
                onValueChange={action}
                value={selected}
                backgroundActive="#1C58D9"
                backgroundInactive="#D5D5D5"
                circleBorderActiveColor="#FFFFFF"
                circleBorderInactiveColor="#FFFFFF"
                renderActiveText={false}
                renderInActiveText={false}
                circleActiveColor="#FFFFFF"
                circleInActiveColor="#FFFFFF"
                circleSize={30}
                switchLeftPx={2.2}
                switchRightPx={2.2}
                barHeight={32.4}
                innerCircleStyle={{alignItems: 'center', justifyContent: 'center', padding: 10}}
                switchWidthMultiplier={2}
            />
        );
    } else if (type === OptionType.ARROW) {
        actionComponent = (
            <Icon
                color={changeOpacity('#3f4350', 0.32)}
                name="chevron-right"
                size={24}
                style={arrowStyle}
            />
        );
    } else if (type === OptionType.REMOVE) {
        actionComponent = (
            <TouchableWithFeedback
                hitSlop={hitSlop}
                onPress={onRemove}
                style={[styles.iconContainer]}
                type="opacity"
                testID={`${testID}.remove.button`}>
                <Icon name="close" size={18} color={changeOpacity('#3f4350', 0.64)} />
            </TouchableWithFeedback>
        );
    }

    const onPress = useCallback(() => {
        action?.(value || '');
    }, [value, action]);

    const component = (
        <View testID={testID} style={[styles.container, containerStyle]} onLayout={onLayout}>
            <View style={styles.row}>
                <View style={styles.labelContainer}>
                    {Boolean(icon) && (
                        <View style={styles.iconContainer}>
                            <OptionIcon
                                icon={icon!}
                                iconColor={iconColor}
                                destructive={destructive}
                            />
                        </View>
                    )}
                    {type === OptionType.RADIO && radioComponent}
                    <View style={labelStyle}>
                        <Text
                            style={[labelTextStyle, optionLabelTextStyle]}
                            testID={`${testID}.label`}>
                            {label}
                        </Text>
                        {Boolean(description) && (
                            <Text
                                style={[descriptionTextStyle, optionDescriptionTextStyle]}
                                testID={`${testID}.description`}>
                                {description}
                            </Text>
                        )}
                    </View>
                </View>
            </View>
            {Boolean(actionComponent || info) && (
                <View style={styles.actionContainer}>
                    {Boolean(info) && (
                        <View style={styles.infoContainer}>
                            <Text
                                style={[
                                    styles.info,
                                    !actionComponent && styles.iconContainer,
                                    destructive && {color: '#ff3333'},
                                ]}
                                testID={`${testID}.info`}>
                                {info}
                            </Text>
                        </View>
                    )}
                    {actionComponent}
                </View>
            )}
        </View>
    );
    if (Object.values(TouchableOptionTypes).includes(type)) {
        return <TouchableOpacity onPress={onPress}>{component}</TouchableOpacity>;
    }

    return component;
};

export default OptionItem;
