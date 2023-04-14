import { useRef, useEffect, useCallback } from 'react';

export const useIsUnmounted = (): (() => boolean) => {
    const isUnmountedRef = useRef(false);
    const get = useCallback(() => isUnmountedRef.current, []);

    useEffect(() => {
        isUnmountedRef.current = false;
        return () => {
            isUnmountedRef.current = true;
        };
    }, []);
    return get;
};
