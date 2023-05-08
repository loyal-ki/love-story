import {useState} from 'react';
import {useIntl} from 'react-intl';
import {useWindowDimensions} from 'react-native';

import {useTheme} from '@app/context/theme';
import {useDefaultHeaderHeight} from '@app/hooks/header';

export const useViewModel = () => {
    const intl = useIntl();

    const {formatMessage} = intl;

    const {theme} = useTheme();

    const defaultHeight = useDefaultHeaderHeight();

    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);

    return {theme, defaultHeight, layout, index, setIndex, formatMessage};
};
