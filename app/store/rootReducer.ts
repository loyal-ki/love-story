import {AnyAction, combineReducers} from 'redux';

import {counterReducer} from './reducers';
import {postReducer} from './reducers/post/post.reducer';

const appReducer = combineReducers({
    counter: counterReducer,
    post: postReducer,
});

export type ReduxAppState = ReturnType<typeof appReducer>;

const rootReducer = (state: ReduxAppState, action: AnyAction): ReduxAppState => {
    const appState: ReduxAppState | undefined = state;
    return appReducer(appState, action);
};

export default rootReducer;
