import {MarginProps} from '@typings/shared/margin';
import {ReactNode} from 'react';

import {TestIdProps} from '@app/models/interface';
import {IconNameEnum} from '@components/icon';

export interface ButtonSharedProps extends MarginProps, TestIdProps {
    title?: ReactNode;
    iconName?: IconNameEnum;
    disabled?: boolean;
    onPress: () => void;
}
