/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-console */
// @ts-nocheck
import stringifyObject from 'stringify-object';

const prefixFormat = '%s\x1b[0m';

const colours = {
    black: `\x1b[30m${prefixFormat}`,
    red: `\x1b[31m${prefixFormat}`,
    green: `\x1b[32m${prefixFormat}`,
    yellow: `\x1b[33m${prefixFormat}`,
    blue: `\x1b[34m${prefixFormat}`,
    magenta: `\x1b[35m${prefixFormat}`,
    cyan: `\x1b[36m${prefixFormat}`,
    white: `\x1b[37m${prefixFormat}`,
    gray: `\x1b[90m${prefixFormat}`,
    crimson: `\x1b[38m${prefixFormat}`,
};

export function logError(...args: any[]) {
    console.error(colours.red, ...args);
}

export function logWarning(...args: any[]) {
    console.warn(colours.yellow, ...args);
}

export function logInfo(...args: any[]) {
    console.log(colours.green, ...args);
}

export function logDebug(...args: any[]) {
    console.debug(colours.cyan, ...args);
}

export function formatLog(value) {
    return stringifyObject(value, {
        indent: '  ',
        singleQuotes: false,
    });
}
