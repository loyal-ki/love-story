import {Epic, ActionsObservable} from 'redux-observable';
import {defer} from 'rxjs';
import {map, switchMap, filter} from 'rxjs/operators';
import {isActionOf} from 'typesafe-actions';

import {DatabaseLocal} from '@app/database';
import {DEFAULT_LOCALE} from '@app/localization';
import {localeActions} from '@app/store/actions';
import {ILocaleActionType} from '@app/store/actions/actions.types';

import {ReduxAppState} from '@store/rootReducer';

const requestGetLocaleEpic: Epic<ILocaleActionType, ILocaleActionType, ReduxAppState> = (
    action$: ActionsObservable<ILocaleActionType>
) => {
    return action$.pipe(
        filter(isActionOf(localeActions.fetchLocaleFromDbRequest)),
        switchMap(_ => {
            return defer(() => DatabaseLocal.preferencesRepository().getLocale()).pipe(
                map(data => localeActions.fetchLocaleFromDbSuccess(data || DEFAULT_LOCALE))
            );
        })
    );
};

const requestSetLocaleEpic: Epic<ILocaleActionType, ILocaleActionType, ReduxAppState> = (
    action$: ActionsObservable<ILocaleActionType>
) => {
    return action$.pipe(
        filter(isActionOf(localeActions.setLocaleToDbRequest)),
        switchMap(action => {
            return defer(() =>
                DatabaseLocal.preferencesRepository().setLocale(action.payload.locale)
            ).pipe(map(_ => localeActions.setLocaleToDbSuccess()));
        })
    );
};

export default [requestGetLocaleEpic, requestSetLocaleEpic];
