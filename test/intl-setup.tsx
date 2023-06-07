import React from 'react';
import {createIntl} from 'react-intl';

import {UserLocaleProvider} from '@app/context/locale';
import {getTranslations} from '@app/localization';

import {ThemeContext, getDefaultThemeByAppearance} from '@context/theme';

export function getIntlShape(locale = 'en') {
    return createIntl({
        locale,
        messages: getTranslations(locale),
    });
}

export const renderWithEverythingWrapper: React.FC<any> = (
    {children},
    {locale = 'en', ...renderOptions} = {}
) => (
    <UserLocaleProvider>
        {/* <IntlProvider locale={locale} messages={getTranslations(locale)}> */}
        <ThemeContext.Provider
            // eslint-disable-next-line react/jsx-no-constructed-context-values
            value={{theme: getDefaultThemeByAppearance(), updateTheme: _value => {}}}>
            {children}
        </ThemeContext.Provider>
        {/* </IntlProvider> */}
    </UserLocaleProvider>
);
