import {DEFAULT_LOCALE, getTranslations, t} from '@app/localization';
import {ValidationResult, isNilOrEmpty, validateEmail} from '@app/utils';

const translations = getTranslations(DEFAULT_LOCALE);

export const validateEmailContact = (email?: string): ValidationResult<string> => {
    if (isNilOrEmpty(email)) {
        return ValidationResult.error(translations[t('home.input_email_empty')]);
    }

    if (!validateEmail(email!)) {
        return ValidationResult.error(
            translations[t('home.floating_input_email_message_error_invalid_email')]
        );
    }
    return ValidationResult.ok();
};
