import {Epic, ActionsObservable} from 'redux-observable';
import {defer} from 'rxjs';
import {map, switchMap, filter} from 'rxjs/operators';
import {isActionOf} from 'typesafe-actions';

import {Themes} from '@app/constants/themes';
import {DatabaseLocal} from '@app/database';
import {IThemeActionType} from '@app/store/actions/actions.types';
import {themeActions} from '@app/store/actions/theme/theme.action';

import {ReduxAppState} from '@store/rootReducer';

const requestGetThemeEpic: Epic<IThemeActionType, IThemeActionType, ReduxAppState> = (
    action$: ActionsObservable<IThemeActionType>
) => {
    return action$.pipe(
        filter(isActionOf(themeActions.fetchThemeFromDbRequest)),
        switchMap(_ => {
            return defer(() => DatabaseLocal.preferencesRepository().getTheme()).pipe(
                map(data => themeActions.fetchThemeFromDbSuccess(data ?? Themes.light))
            );
        })
    );
};

const requestSetThemeEpic: Epic<IThemeActionType, IThemeActionType, ReduxAppState> = (
    action$: ActionsObservable<IThemeActionType>
) => {
    return action$.pipe(
        filter(isActionOf(themeActions.setThemeToDbRequest)),
        switchMap(action => {
            return defer(() =>
                DatabaseLocal.preferencesRepository().setTheme(action.payload.theme)
            ).pipe(map(_ => themeActions.setThemeToDbSuccess()));
        })
    );
};

export default [requestGetThemeEpic, requestSetThemeEpic];
