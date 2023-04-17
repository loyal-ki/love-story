import {applyMiddleware, createStore} from 'redux';
import {createEpicMiddleware} from 'redux-observable';

import {createLogger} from './middleware/logger';
import rootEpic from './rootEpic';
import appReducer, {ReduxAppState} from './rootReducer';

export const initializeStore = (production = false) => {
    const epicMiddleware = createEpicMiddleware<any, any, ReduxAppState>();

    const loggerMiddleware = createLogger();

    const store = createStore(appReducer, applyMiddleware(epicMiddleware, loggerMiddleware));

    epicMiddleware.run(rootEpic);

    return store;
};

const defaultStore = initializeStore();
export default defaultStore;
