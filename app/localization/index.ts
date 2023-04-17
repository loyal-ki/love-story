/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
import {logError} from '@app/utils';

import 'moment/min/locales';
import availableLanguages from './languages';

import en from '@assets/i18n/en.json';

// eslint-disable-next-line import/order
import {getLocales} from 'react-native-localize';

const deviceLocale = getLocales()[0].languageTag;

export const PRIMARY_LOCALE = 'en';

export function getLocaleFromLanguage(lang: string) {
    const languageCode = lang.split('-')[0];
    const locale = availableLanguages[lang] || availableLanguages[languageCode] || PRIMARY_LOCALE;
    return locale;
}

export const DEFAULT_LOCALE = getLocaleFromLanguage(deviceLocale);

const loadTranslation = (locale?: string): Record<string, string> => {
    try {
        let translations: Record<string, string>;
        switch (locale) {
            case 'en':
                require('@formatjs/intl-pluralrules/locale-data/en');
                require('@formatjs/intl-numberformat/locale-data/en');
                require('@formatjs/intl-datetimeformat/locale-data/en');

                translations = require('@assets/i18n/en.json');
                break;
            case 'vi':
                require('@formatjs/intl-pluralrules/locale-data/vi');
                require('@formatjs/intl-numberformat/locale-data/vi');
                require('@formatjs/intl-datetimeformat/locale-data/vi');

                translations = require('@assets/i18n/vi.json');
                break;

            default:
                require('@formatjs/intl-pluralrules/locale-data/en');
                require('@formatjs/intl-numberformat/locale-data/en');
                require('@formatjs/intl-datetimeformat/locale-data/en');

                translations = require('@assets/i18n/en.json');
                break;
        }
        return translations;
    } catch (e) {
        logError('No translation found', e);
        return en;
    }
};

export const getTranslations = (lang: string): Record<string, string> => {
    const locale = getLocaleFromLanguage(lang);
    return loadTranslation(locale);
};

export const getLocalizedMessage = (lang: string, id: string, defaultMessage?: string): string => {
    const locale = getLocaleFromLanguage(lang);
    const translations = getTranslations(locale);
    return translations[id] || defaultMessage || '';
};

export const t = (v: string): string => {
    return v;
};
