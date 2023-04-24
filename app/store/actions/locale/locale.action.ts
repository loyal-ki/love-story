import {createAction} from 'typesafe-actions';

const fetchLocaleFromDbRequest = createAction('locale/fetchLocaleFromDbRequest', () => {
    return {};
})();

const fetchLocaleFromDbSuccess = createAction(
    'locale/fetchLocaleFromDbSuccess',
    (locale: string) => {
        return {locale};
    }
)();

const setLocaleToDbRequest = createAction('locale/setLocaleToDbRequest', (locale: string) => {
    return {locale};
})();

const setLocaleToDbSuccess = createAction('locale/setLocaleToDbSuccess', () => {
    return {};
})();

export const localeActions = {
    fetchLocaleFromDbRequest,
    fetchLocaleFromDbSuccess,
    setLocaleToDbRequest,
    setLocaleToDbSuccess,
};
