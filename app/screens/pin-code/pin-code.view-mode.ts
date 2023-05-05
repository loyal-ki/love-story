import {useTheme} from '@app/context/theme';

export const useViewModel = () => {
    const {theme} = useTheme();

    return {
        theme,
    };
};
