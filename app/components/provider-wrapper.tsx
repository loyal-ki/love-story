import React, {ComponentType} from 'react';
import {Provider} from 'react-redux';

import store from '@app/store';

import {UserLocaleProvider} from '@context/locale';
import {ThemeProvider} from '@context/theme';

export function withProviderWrapper(Component: ComponentType): ComponentType {
    return function providerWrapper(props: any) {
        return (
            <Provider store={store}>
                <UserLocaleProvider>
                    <ThemeProvider>
                        <Component {...props} />
                    </ThemeProvider>
                </UserLocaleProvider>
            </Provider>
        );
    };
}
