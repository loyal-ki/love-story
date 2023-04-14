import {DEFAULT_LOCALE, getLocalizedMessage, t} from '@app/localization';

const extractMessageFromError = (error: unknown, defaultMessage = ''): string | undefined => {
    return defaultMessage;
};

export default {extractMessageFromError};
