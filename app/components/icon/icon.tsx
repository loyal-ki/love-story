import React, {FC, useMemo} from 'react';

import {iconNameMap} from './icon-name.map';
import {IconProps} from './icon.props';

export const Icon: FC<IconProps> = ({
    name,
    size = 16,
    width = size,
    height = size,
    color,
    style,
    testID,
}) => {
    const Svg = useMemo(() => iconNameMap[name], [name]);

    return <Svg width={width} height={height} color={color} style={style} testID={testID} />;
};
