import {useMemo} from 'react';

import {useTheme} from '@app/context/theme';

export const useViewModel = () => {
    const {theme} = useTheme();

    const slides = useMemo(
        () => [
            {
                color: '#EEC4C4',
                title: 'Dessert Recipes',
                description:
                    'Hot or cold, our dessert recipes can turn an average meal into a memorable event',
            },
            {
                color: '#BEE5D3',
                title: 'Easy Meal Ideas',
                description:
                    'explore recipes by food type, preparation method, cuisine, country and more',
            },
            {
                color: '#9FD8DF',
                title: '10000+ Recipes',
                description:
                    'Browse thousands of curated recipes from top chefs, each with detailled cooking instructions',
            },
        ],
        []
    );

    return {
        theme,
        slides,
    };
};
