import {StyleProp, ViewStyle} from 'react-native';
import {SvgProps} from 'react-native-svg';

import {TestIdProps} from '@app/models/interface/test-id.props';

import {IconNameEnum} from './icon-name.enum';

export interface IconProps extends TestIdProps, SvgProps {
    name: IconNameEnum;
    size?: number;
    color?: string;
    style?: StyleProp<ViewStyle>;
}
