import {localeActions} from './locale/locale.action';
import {postActions} from './post/post.action';
import {themeActions} from './theme/theme.action';

import type {ActionType} from 'typesafe-actions';

export type IPostActionType = ActionType<typeof postActions>;

export type ILocaleActionType = ActionType<typeof localeActions>;

export type IThemeActionType = ActionType<typeof themeActions>;
