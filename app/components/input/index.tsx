/* eslint-disable react-hooks/exhaustive-deps */
import {debounce} from 'lodash';
import React, {
    useState,
    useEffect,
    useRef,
    useImperativeHandle,
    forwardRef,
    useMemo,
    useCallback,
} from 'react';
import {
    GestureResponderEvent,
    LayoutChangeEvent,
    NativeSyntheticEvent,
    StyleProp,
    TargetedEvent,
    Text,
    TextInput,
    TextInputFocusEventData,
    TextInputProps,
    TextStyle,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from 'react-native';
import Animated, {useAnimatedStyle, withTiming, Easing} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';

import {changeOpacity, makeStyleSheetFromTheme} from '@utils/theme';

import {getLabelPositions, onExecution} from './utils';

const DEFAULT_INPUT_HEIGHT = 48;
const BORDER_DEFAULT_WIDTH = 1;
const BORDER_FOCUSED_WIDTH = 2;

const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) => ({
    container: {
        width: '100%',
    },
    errorContainer: {
        flexDirection: 'row',
        borderColor: 'transparent',
        borderWidth: 1,
    },
    errorIcon: {
        color: '#ff3333',
        fontSize: 14,
        marginRight: 7,
        top: 5,
    },
    errorText: {
        color: '#ff3333',
        fontSize: 12,
        lineHeight: 16,
        paddingVertical: 5,
    },
    input: {
        backgroundColor: 'transparent',
        borderWidth: 0,
        flex: 1,
        paddingHorizontal: 0,
        paddingTop: 0,
        paddingBottom: 0,
    },
    label: {
        position: 'absolute',
        color: changeOpacity('#3f4350', 0.64),
        left: 16,
        fontSize: 16,
        zIndex: 10,
        maxWidth: 315,
    },
    readOnly: {
        backgroundColor: changeOpacity('#FFFFFF', 0.16),
    },
    smallLabel: {
        fontSize: 12,
    },
    textInput: {
        flexDirection: 'row',
        fontSize: 16,
        paddingTop: 12,
        paddingBottom: 12,
        paddingHorizontal: 16,
        color: '#3f4350',
        borderColor: changeOpacity('#3f4350', 0.16),
        borderRadius: 4,
        borderWidth: BORDER_DEFAULT_WIDTH,
        backgroundColor: '#FFFFFF',
    },
}));

export type FloatingInputRef = {
    blur: () => void;
    focus: () => void;
    isFocused: () => boolean;
};

type FloatingInputProps = TextInputProps & {
    containerStyle?: ViewStyle;
    editable?: boolean;
    endAdornment?: React.ReactNode;
    error?: string;
    errorIcon?: string;
    isKeyboardInput?: boolean;
    label: string;
    labelTextStyle?: TextStyle;
    multiline?: boolean;
    onBlur?: (event: NativeSyntheticEvent<TargetedEvent>) => void;
    onFocus?: (e: NativeSyntheticEvent<TargetedEvent>) => void;
    onLayout?: (e: LayoutChangeEvent) => void;
    onPress?: (e: GestureResponderEvent) => void;
    placeholder?: string;
    showErrorIcon?: boolean;
    testID?: string;
    textInputStyle?: TextStyle;
    theme: Theme;
    value?: string;
};

const FloatingInput = forwardRef<FloatingInputRef, FloatingInputProps>(
    (
        {
            containerStyle,
            editable = true,
            error,
            errorIcon = 'warning',
            endAdornment,
            isKeyboardInput = true,
            label = '',
            labelTextStyle,
            multiline,
            onBlur,
            onFocus,
            onLayout,
            onPress,
            placeholder,
            showErrorIcon = true,
            testID,
            textInputStyle,
            theme,
            value,
            ...props
        }: FloatingInputProps,
        ref
    ) => {
        const [focused, setIsFocused] = useState(false);
        const [focusedLabel, setIsFocusLabel] = useState<boolean | undefined>();
        const inputRef = useRef<TextInput>(null);
        const debouncedOnFocusTextInput = debounce(setIsFocusLabel, 500, {
            leading: true,
            trailing: false,
        });
        const styles = getStyleSheet(theme);

        const positions = useMemo(
            () => getLabelPositions(styles.textInput, styles.label, styles.smallLabel),
            [styles]
        );
        const size = useMemo(
            () => [styles.textInput.fontSize, styles.smallLabel.fontSize],
            [styles]
        );

        useImperativeHandle(
            ref,
            () => ({
                blur: () => inputRef.current?.blur(),
                focus: () => inputRef.current?.focus(),
                isFocused: () => inputRef.current?.isFocused() || false,
            }),
            [inputRef]
        );

        useEffect(() => {
            if (!focusedLabel && (value || props.defaultValue)) {
                debouncedOnFocusTextInput(true);
            }
        }, [value, props.defaultValue]);

        const onTextInputBlur = useCallback(
            (e: NativeSyntheticEvent<TextInputFocusEventData>) =>
                onExecution(
                    e,
                    () => {
                        setIsFocusLabel(Boolean(value));
                        setIsFocused(false);
                    },
                    onBlur
                ),
            [onBlur]
        );

        const onTextInputFocus = useCallback(
            (e: NativeSyntheticEvent<TextInputFocusEventData>) =>
                onExecution(
                    e,
                    () => {
                        setIsFocusLabel(true);
                        setIsFocused(true);
                    },
                    onFocus
                ),
            [onFocus]
        );

        const onAnimatedTextPress = useCallback(() => {
            return focused ? null : inputRef?.current?.focus();
        }, [focused]);

        const shouldShowError = !focused && error;
        const onPressAction = !isKeyboardInput && editable && onPress ? onPress : undefined;

        const combinedContainerStyle = useMemo(() => {
            return [styles.container, containerStyle];
        }, [styles, containerStyle]);

        const combinedTextInputContainerStyle = useMemo(() => {
            const res: StyleProp<TextStyle> = [styles.textInput];
            if (!editable) {
                res.push(styles.readOnly);
            }
            res.push({
                borderWidth: focusedLabel ? BORDER_FOCUSED_WIDTH : BORDER_DEFAULT_WIDTH,
                height:
                    DEFAULT_INPUT_HEIGHT +
                    (focusedLabel ? BORDER_FOCUSED_WIDTH : BORDER_DEFAULT_WIDTH) * 2,
            });

            if (focused) {
                res.push({borderColor: '#07457E'});
            } else if (shouldShowError) {
                res.push({borderColor: '#ff3333'});
            }

            res.push(textInputStyle);

            if (multiline) {
                res.push({height: 100, textAlignVertical: 'top'});
            }

            return res;
        }, [
            styles,
            theme,
            shouldShowError,
            focused,
            textInputStyle,
            focusedLabel,
            multiline,
            editable,
        ]);

        const combinedTextInputStyle = useMemo(() => {
            const res: StyleProp<TextStyle> = [styles.textInput, styles.input, textInputStyle];

            if (multiline) {
                res.push({height: 80, textAlignVertical: 'top'});
            }

            return res;
        }, [styles, textInputStyle, multiline]);

        const textAnimatedTextStyle = useAnimatedStyle(() => {
            const inputText = placeholder || value || props.defaultValue;
            const index = inputText || focusedLabel ? 1 : 0;
            const toValue = positions[index];
            const toSize = size[index];

            // eslint-disable-next-line prefer-destructuring
            let color = styles.label.color;
            if (shouldShowError) {
                color = '#ff3333';
            } else if (focused) {
                color = '#07457E';
            }

            return {
                top: withTiming(toValue, {duration: 100, easing: Easing.linear}),
                fontSize: withTiming(toSize, {duration: 100, easing: Easing.linear}),
                backgroundColor: focusedLabel || inputText ? '#FFFFFF' : 'transparent',
                paddingHorizontal: focusedLabel || inputText ? 4 : 0,
                color,
            };
        });

        return (
            <TouchableWithoutFeedback onPress={onPressAction} onLayout={onLayout}>
                <View style={combinedContainerStyle}>
                    <Animated.Text
                        onPress={onAnimatedTextPress}
                        style={[styles.label, labelTextStyle, textAnimatedTextStyle]}
                        suppressHighlighting
                        numberOfLines={1}>
                        {label}
                    </Animated.Text>
                    <View style={combinedTextInputContainerStyle}>
                        <TextInput
                            {...props}
                            editable={isKeyboardInput && editable}
                            style={combinedTextInputStyle}
                            placeholder={placeholder}
                            placeholderTextColor={styles.label.color}
                            multiline={multiline}
                            value={value}
                            pointerEvents={isKeyboardInput ? 'auto' : 'none'}
                            onFocus={onTextInputFocus}
                            onBlur={onTextInputBlur}
                            ref={inputRef}
                            underlineColorAndroid="transparent"
                            testID={testID}
                        />
                        {endAdornment}
                    </View>
                    {Boolean(error) && (
                        <View style={styles.errorContainer}>
                            {showErrorIcon && errorIcon && (
                                <Icon name={errorIcon} style={styles.errorIcon} />
                            )}
                            <Text style={styles.errorText} testID={`${testID}.error`}>
                                {error}
                            </Text>
                        </View>
                    )}
                </View>
            </TouchableWithoutFeedback>
        );
    }
);

FloatingInput.displayName = 'FloatingInput';

export default FloatingInput;
