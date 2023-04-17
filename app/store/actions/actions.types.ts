import {postActions} from './post.action';

import type {counterActions} from './counter.action';
import type {ActionType} from 'typesafe-actions';

export type ICounterActionType = ActionType<typeof counterActions>;

export type IPostActionType = ActionType<typeof postActions>;
