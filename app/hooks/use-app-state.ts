import {useEffect, useState} from 'react';
import {AppState} from 'react-native';

export const useAppState = () => {
    const [appState, setAppState] = useState(AppState.currentState);

    useEffect(() => {
        const listener = AppState.addEventListener('change', nextState => {
            setAppState(nextState);
        });

        return () => listener.remove();
    }, [appState]);

    return appState;
};
