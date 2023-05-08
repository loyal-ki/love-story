import {useRef, useEffect, type EffectCallback, type DependencyList} from 'react';

export const useDidUpdate = (callback: EffectCallback, deps?: DependencyList) => {
    const hasMount = useRef(false);

    useEffect(() => {
        if (hasMount.current) {
            callback();
        } else {
            hasMount.current = true;
        }
    }, deps);
};
