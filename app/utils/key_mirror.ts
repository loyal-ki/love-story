/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-continue */
/* eslint-disable no-prototype-builtins */
export function keyMirror<T extends {}>(obj: T): {[K in keyof T]: K} {
    if (!(obj instanceof Object && !Array.isArray(obj))) {
        throw new Error('keyMirror(...): Argument must be an object.');
    }

    const ret: any = {};
    for (const key in obj) {
        if (!obj.hasOwnProperty(key)) {
            continue;
        }

        ret[key] = key;
    }
    return ret;
}
