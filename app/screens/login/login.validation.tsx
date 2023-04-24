import {t} from '@app/localization';
import {ValidationResult, isNilOrEmpty, validateEmail} from '@app/utils';

export const validateEmailContact = (email: string): ValidationResult<string> => {
    if (isNilOrEmpty(email)) {
        return ValidationResult.error(t('home.input_email_empty'));
    }

    if (!validateEmail(email!)) {
        return ValidationResult.error(t('home.floating_input_email_message_error_invalid_email'));
    }
    return ValidationResult.ok();
};
