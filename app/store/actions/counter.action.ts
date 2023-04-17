import {createAction} from 'typesafe-actions';

const setCounter = createAction('counter/setCounter', (count: number) => {
    return {count};
})();

export const counterActions = {
    setCounter,
};
