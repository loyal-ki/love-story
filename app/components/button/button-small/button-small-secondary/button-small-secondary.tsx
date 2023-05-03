import React, {FC} from 'react';

import {Button} from '@components/button/button';
import {ButtonSmallProps} from '@components/button/button-small/button-small.props';

import {getButtonSmallSecondaryStyles} from './button-small-secondary.styles';

export const ButtonSmallSecondary: FC<ButtonSmallProps> = (props: ButtonSmallProps) => {
    const {theme} = props;
    const styleConfig = getButtonSmallSecondaryStyles(theme);

    return <Button {...props} styleConfig={styleConfig} />;
};
