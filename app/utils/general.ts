import _, {PropertyPath} from 'lodash';

import ReactNativeHapticFeedback, {HapticFeedbackTypes} from 'react-native-haptic-feedback';

export function hapticFeedback(method: HapticFeedbackTypes = HapticFeedbackTypes.impactLight) {
    ReactNativeHapticFeedback.trigger(method, {
        enableVibrateFallback: false,
        ignoreAndroidSystemSettings: false,
    });
}

export enum PromiseStatus {
    fulfilled = 'fulfilled',
    rejected = 'rejected',
}

// This allows us to handle errors from independent promises separately and not be interrupted by a failed promise.
Promise.allSettled =
    Promise.allSettled ||
    (<T>(promises: Array<Promise<T>>) =>
        Promise.all(
            promises.map(p =>
                p
                    .then(value => ({
                        status: PromiseStatus.fulfilled,
                        value,
                    }))
                    .catch(reason => ({
                        status: PromiseStatus.rejected,
                        reason,
                    }))
            )
        ));

export const safeGet = (object: unknown, path: PropertyPath, defaultValue: unknown): any => {
    const value = _.get(object, path);
    return _.defaultTo(value, defaultValue);
};

export const isNilOrEmpty = (text: string | null | undefined): boolean => {
    if (_.isNil(text) || _.isEmpty(text)) {
        return true;
    }
    return false;
};

export const isNilOrNaN = (text: string | null | undefined): boolean => {
    if (isNilOrEmpty(text)) {
        return true;
    }
    const number = _.isNumber(text);
    if (_.isNaN(number)) {
        return true;
    }
    return false;
};

export const delay = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
