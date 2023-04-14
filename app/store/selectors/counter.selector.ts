import type {ReduxAppState} from '@store/rootReducer';

export const selectCounter = (globalState: ReduxAppState): number => globalState.counter.count;
