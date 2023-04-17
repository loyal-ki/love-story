import {DependencyList, EffectCallback, useEffect} from 'react';
import {Navigation} from 'react-native-navigation';

type Callback = EffectCallback | (() => Promise<void>);
const useNavButtonPressed = (
    navButtonId: string,
    componentId: string,
    callback: Callback,
    deps?: DependencyList
) => {
    useEffect(() => {
        const unsubscribe = Navigation.events().registerComponentListener(
            {
                navigationButtonPressed: ({buttonId}: {buttonId: string}) => {
                    if (buttonId === navButtonId) {
                        callback();
                    }
                },
            },
            componentId
        );

        return () => {
            unsubscribe.remove();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
};

export default useNavButtonPressed;
