import React, {FC} from 'react';
import {View} from 'react-native';

import {ButtonsContainerStyles} from './buttons-container.styles';

interface Props {
    children?: React.ReactNode;
}

export const ButtonsContainer: FC<Props> = ({children}: Props) => (
    <View style={ButtonsContainerStyles.container}>{children}</View>
);
