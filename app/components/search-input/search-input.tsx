import {debounce} from 'lodash';
import React, {FC, useMemo} from 'react';
import {NativeSyntheticEvent, TextInput, TextInputFocusEventData, View} from 'react-native';

import {changeOpacity, formatSize} from '@app/utils';
import {Icon, IconNameEnum} from '@components/icon';

import {getSearchInputStyleSheet} from './search-input.styles';

type Props = {
    value?: string | undefined;
    placeholder?: string | undefined;
    onChangeText?: (text: string) => void;
    onBlur?: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) | undefined;
    theme: Theme;
    focusable?: boolean;
};

export const SearchInput: FC<Props> = ({
    value,
    placeholder,
    theme,
    focusable = false,
    onChangeText,
    onBlur,
}: Props) => {
    const styles = getSearchInputStyleSheet(theme);

    const handleSearchQueryChange = useMemo(
        () =>
            debounce((newValue: string) => {
                onChangeText?.(newValue);
            }),
        [onChangeText]
    );

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Icon
                    name={IconNameEnum.SearchIcon}
                    size={formatSize(24)}
                    color={theme.textInput}
                />
            </View>
            <TextInput
                value={value}
                style={styles.input}
                placeholder={placeholder}
                focusable={focusable}
                placeholderTextColor={changeOpacity(theme.textInput, 0.7)}
                onChangeText={handleSearchQueryChange}
                underlineColorAndroid="transparent"
                selectionColor={theme.textInput}
                onBlur={onBlur}
            />
        </View>
    );
};
