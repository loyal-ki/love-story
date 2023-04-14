import React, {ComponentType} from 'react';
import {Provider} from 'react-redux';
import {ThemeProvider} from '@context/theme';
import store from '@app/store';
import {UserLocaleProvider} from '@context/locale';

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
