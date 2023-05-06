import React, {FC} from 'react';
import {View} from 'react-native';

import {CodeInputNumber} from './code_input_number';
import {getCodeInputContainerStyleSheet} from './styles';

interface ICodeInput {
    value: string;
    length: number;
    theme: Theme;
}

export const CodeInputContainer: FC<ICodeInput> = ({value, length, theme}: ICodeInput) => {
    const oneTimeCode = value.padEnd(length, '0');

    const styles = getCodeInputContainerStyleSheet(theme);
    return (
        <View style={styles.container}>
            {oneTimeCode.split('').map((character, index) => (
                <CodeInputNumber
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    theme={theme}
                    filled={index < value.length}
                    active={index === value.length}>
                    {character}
                </CodeInputNumber>
            ))}
        </View>
    );
};
