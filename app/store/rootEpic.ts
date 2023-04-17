import {combineEpics, Epic} from 'redux-observable';

import postEpic from './epics/post.epic';

const epics: Epic[] = [...Object.values(postEpic)];

const rootEpic = combineEpics(...epics);
export default rootEpic;
