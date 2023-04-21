import React, {ComponentType, createContext, useEffect, useState} from 'react';
import {IntlProvider} from 'react-intl';

import {DatabaseLocal} from '@app/database';
import {useMemoizedCallback} from '@app/hooks';
import {DEFAULT_LOCALE, getTranslations} from '@app/localization';

type Props = {
    children: React.ReactNode;
};

type WithUserLocaleProps = {
    locale: string;
};

export const UserLocaleContext = createContext(DEFAULT_LOCALE);
const {Consumer, Provider} = UserLocaleContext;

export const UserLocaleProvider = ({children}: Props) => {
    const [locale, setLocale] = useState(() => DEFAULT_LOCALE);

    const updateLocale = useMemoizedCallback(async () => {
        await DatabaseLocal.preferencesRepository().setLocale(locale);
    }, [locale]);
    
    useEffect(() => {
        updateLocale();
    }, [locale, updateLocale]);

    return (
        <Provider value={locale}>
            <IntlProvider locale={locale} messages={getTranslations(locale)}>
                {children}
            </IntlProvider>
        </Provider>
    );
};

export const withUserLocale = <T extends WithUserLocaleProps>(
    Component: ComponentType<T>
): ComponentType<T> => {
    // eslint-disable-next-line react/function-component-definition
    return function UserLocaleComponent(props) {
        return (
            <Consumer>
                {(locale: string) => (
                    <IntlProvider locale={locale} messages={getTranslations(locale)}>
                        <Component {...props} />
                    </IntlProvider>
                )}
            </Consumer>
        );
    };
};

export function useUserLocale(): string {
    return React.useContext(UserLocaleContext);
}
