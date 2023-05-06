import {useMemo} from 'react';

import {useTheme} from '@app/context/theme';

export const useViewModel = () => {
    const {theme} = useTheme();

    const slides = useMemo(
        () => [
            {
                color: '#FF9999',
                title: 'Title 1',
                description:
                    'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
            },
            {
                color: '#86C8BC',
                title: 'Title 2',
                description:
                    'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
            },
            {
                color: '#264E70',
                title: 'Title 3',
                description:
                    'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
            },
        ],
        []
    );

    return {
        theme,
        slides,
    };
};
