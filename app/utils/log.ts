/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
// import stringifyObject from 'stringify-object';

export const logError = (...args: any[]) => {
    console.error(args);
};

export const logWarning = (...args: any[]) => {
    console.warn(args);
};

export const logInfo = (...args: any[]) => {
    console.log(args);
};

export const logDebug = (...args: any[]) => {
    console.debug(args);
};
export const formatLog = (value: unknown) => {
    return JSON.stringify(value, null, 2);
};
