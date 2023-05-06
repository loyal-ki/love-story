/* eslint-disable react/no-array-index-key */
import React, {FC} from 'react';
import {Text} from 'react-native';

import {getDescriptionStyles} from './styles';

export type DescriptionType = string | {text: string; bold?: boolean}[];

interface DescriptionProps {
    description: DescriptionType;
    theme: Theme;
}

export const Description: FC<DescriptionProps> = ({description, theme}) => {
    const styles = getDescriptionStyles(theme);

    if (Array.isArray(description)) {
        return (
            <Text style={styles.description}>
                {description.map((item, index) => (
                    <Text key={index} style={item.bold ? styles.boldDescriptionPiece : undefined}>
                        {item.text}
                    </Text>
                ))}
            </Text>
        );
    }

    return <Text style={styles.description}>{description}</Text>;
};
