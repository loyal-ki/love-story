// eslint-disable-next-line import/no-cycle
import {keyMirror} from '@app/utils';

export const Navigation = () =>
    keyMirror({
        NAVIGATE_TO_TAB: null,
        NAVIGATION_HOME: null,
        NAVIGATION_SHOW_OVERLAY: null,
    });
