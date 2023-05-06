import React, {FC} from 'react';
import {StyleProp, Text, TextStyle, View} from 'react-native';

import {isDefined} from '@app/utils';

import {DescriptionType, Description} from './description';
import {getLabelStyles} from './styles';

interface Props {
    label?: string;
    description?: DescriptionType;
    labelStyle?: StyleProp<TextStyle>;
    theme: Theme;
}

export const Label: FC<Props> = ({label, description, labelStyle, theme}) => {
    const styles = getLabelStyles(theme);

    return (
        <View style={styles.container}>
            <View style={styles.labelContainer}>
                {isDefined(label) && <Text style={[styles.label, labelStyle]}>{label}</Text>}
            </View>

            {isDefined(description) && <Description theme={theme} description={description} />}
        </View>
    );
};
