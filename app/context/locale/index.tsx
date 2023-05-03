import React, {ComponentType, createContext, useMemo} from 'react';
import {IntlProvider} from 'react-intl';
import {useDispatch, useSelector} from 'react-redux';

import {useMemoizedCallback, useMount} from '@app/hooks';
import {DEFAULT_LOCALE, getTranslations} from '@app/localization';
import {localeActions} from '@app/store/actions';
import {selectLocaleFromStore} from '@app/store/selectors';

type Props = {
    children: React.ReactNode;
};

type WithUserLocaleProps = {
    locale: string;
    updateLocale: (value: string) => void;
};

export const UserLocaleContext = createContext({
    locale: DEFAULT_LOCALE,
    updateLocale: (value: string) => {},
});

const {Consumer, Provider} = UserLocaleContext;

// eslint-disable-next-line import/no-mutable-exports
export let globalLocale: string = DEFAULT_LOCALE;


/* //////////////////////////////////////////////////////////////
                    LOCALE CONFIGURATION 
  ////////////////////////////////////////////////////////////// */
export const UserLocaleProvider = ({children}: Props) => {
    const locale = useSelector(selectLocaleFromStore);
    globalLocale = locale;

    const reduxDispatch = useDispatch();

    const initLocale = useMemoizedCallback(() => {
        reduxDispatch(localeActions.fetchLocaleFromDbRequest());
    }, [reduxDispatch]);

    const updateLocale = useMemoizedCallback(
        (value: string) => {
            reduxDispatch(localeActions.setLocaleToDbRequest(value));
        },
        [reduxDispatch]
    );

    const localRef = useMemo(() => {
        return {locale, updateLocale};
    }, [locale, updateLocale]);

    useMount(initLocale);

    return (
        <Provider value={localRef}>
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
                {({locale, updateLocale}) => (
                    <IntlProvider locale={locale} messages={getTranslations(locale)}>
                        <Component {...props} />
                    </IntlProvider>
                )}
            </Consumer>
        );
    };
};

export function useUserLocale(): WithUserLocaleProps {
    return React.useContext(UserLocaleContext);
}
