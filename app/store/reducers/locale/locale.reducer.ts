import {createReducer} from 'typesafe-actions';

import {DEFAULT_LOCALE} from '@app/localization';

import {ILocaleActionType} from '@store/actions/actions.types';
import {localeActions} from '@store/actions/locale/locale.action';

export const initState: ILocaleState = {
    locale: DEFAULT_LOCALE,
};

export const localeReducer = createReducer<ILocaleState, ILocaleActionType>(initState)
    .handleAction(localeActions.fetchLocaleFromDbRequest, (state, _) => {
        return {
            ...state,
        };
    })
    .handleAction(localeActions.fetchLocaleFromDbSuccess, (state, {payload: {locale}}) => {
        return {
            ...state,
            locale,
        };
    })
    .handleAction(localeActions.setLocaleToDbRequest, (state, {payload: {locale}}) => {
        return {
            ...state,
            locale,
        };
    });
