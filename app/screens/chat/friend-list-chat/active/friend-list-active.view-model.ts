import {useMount} from '@app/hooks';

export const useViewModel = () => {
    useMount(() => {
        console.log('called 1');
    });
    return {};
};
