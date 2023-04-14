import {useMemoizedCallback, useMount} from '@app/hooks';
import {DEFAULT_LOCALE, PRIMARY_LOCALE, getTranslations} from '@app/localization';
import React, {ComponentType, createContext, useState} from 'react';
import {IntlProvider} from 'react-intl';

type Props = {
    children: React.ReactNode;
};

type WithUserLocaleProps = {
    locale: string;
};

export const UserLocaleContext = createContext(DEFAULT_LOCALE);
const {Consumer, Provider} = UserLocaleContext;

export const UserLocaleProvider = ({children}: Props) => {
    const [locale, setLocale] = useState(() => PRIMARY_LOCALE);

    const init = useMemoizedCallback(() => {
        
    }, []);

    useMount(init);

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
