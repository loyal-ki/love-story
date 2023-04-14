import type {ActionType} from 'typesafe-actions';
import type {counterActions} from './counter.action';
import {postActions} from './post.action';

export type ICounterActionType = ActionType<typeof counterActions>;

export type IPostActionType = ActionType<typeof postActions>;
