export class ValidationResult<T> {
    static ok = <Meta>(): ValidationResult<Meta> => {
        return new ValidationResult(true, undefined);
    };

    static error = <Meta>(errorMessage: string): ValidationResult<Meta> => {
        return new ValidationResult(false, errorMessage);
    };

    isValid: boolean;

    errorMessage: string | undefined;

    meta?: T;

    constructor(isValid: boolean, errorMessage: string | undefined, meta?: T) {
        this.isValid = isValid;
        this.errorMessage = errorMessage;
        this.meta = meta;
    }
}

// eslint-disable-next-line no-useless-escape
const REGEX_EMAIL = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;

export const validateEmail = (email: string): boolean => {
    const reg = REGEX_EMAIL;
    if (reg.test(email) === false) {
        return false;
    }
    return true;
};
