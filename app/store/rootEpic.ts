import {combineEpics, Epic} from 'redux-observable';

import localeEpic from './epics/locale/locale.epic';
import postEpic from './epics/post/post.epic';
import themeEpic from './epics/theme/theme.epic';

const epics: Epic[] = [
    ...Object.values(postEpic),
    ...Object.values(themeEpic),
    ...Object.values(localeEpic),
];

const rootEpic = combineEpics(...epics);
export default rootEpic;
