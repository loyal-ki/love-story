import {createSelector} from 'reselect';

import type {ReduxAppState} from '@store/rootReducer';

const state = (globalState: ReduxAppState) => globalState.theme;

export const selectThemeFromStore = createSelector(state, theme => theme.theme);
