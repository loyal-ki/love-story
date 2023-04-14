import React, { DependencyList, useRef, useCallback } from 'react';

export const useMemoizedCallback = <T extends (...a: any[]) => any>(
    callback: T,
    deps: DependencyList
): T => {
    // Instance var to hold the actual callback.
    const callbackRef = useRef(callback);

    // The memoized callback that won't change and calls the changed callbackRef.
    const memoizedCallback = useCallback((...args: any) => {
        return callbackRef.current(...args);
    }, []);

    // The callback that is constantly updated according to the inputs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const updatedCallback = React.useCallback(callback, deps);

    // The effect updates the callbackRef depending on the inputs.
    React.useEffect(() => {
        callbackRef.current = updatedCallback;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    // Return the memoized callback.
    return memoizedCallback as T;
};
