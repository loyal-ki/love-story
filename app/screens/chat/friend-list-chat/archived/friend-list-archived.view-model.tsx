import {useMount} from '@app/hooks';

export const useViewModel = () => {
    useMount(() => {
        console.log('called 2');
    });
    return {};
};
