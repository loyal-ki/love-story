import {createSelector} from 'reselect';

import type {ReduxAppState} from '@store/rootReducer';

const state = (globalState: ReduxAppState) => globalState.locale;

export const selectLocaleFromStore = createSelector(state, locale => locale.locale);
