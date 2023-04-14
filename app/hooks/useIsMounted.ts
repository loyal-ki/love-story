import { useRef, useEffect, useCallback } from 'react';

export const useIsMounted = (): (() => boolean) => {
    const isMountedRef = useRef(true);
    const get = useCallback(() => isMountedRef.current, []);

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        };
    }, []);
    return get;
};
