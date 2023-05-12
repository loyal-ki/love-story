import {useIntl} from 'react-intl';

import {useTheme} from '@app/context/theme';

export const useViewModel = () => {
    const intl = useIntl();

    const {theme} = useTheme();

    return {
        theme,
        intl,
    };
};
