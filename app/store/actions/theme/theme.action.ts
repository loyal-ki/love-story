import {createAction} from 'typesafe-actions';

const fetchThemeFromDbRequest = createAction('theme/fetchThemeFromDbRequest', () => {
    return {};
})();

const fetchThemeFromDbSuccess = createAction('theme/fetchThemeFromDbSuccess', (theme: Theme) => {
    return {theme};
})();

const setThemeToDbRequest = createAction('theme/setThemeToDbRequest', (theme: Theme) => {
    return {theme};
})();

const setThemeToDbSuccess = createAction('theme/setThemeToDbSuccess', () => {
    return {};
})();

export const themeActions = {
    fetchThemeFromDbRequest,
    fetchThemeFromDbSuccess,
    setThemeToDbRequest,
    setThemeToDbSuccess,
};
