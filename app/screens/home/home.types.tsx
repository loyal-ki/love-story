import {ValidationResult} from '@app/utils';

export const SET_PHONE = 'SET_PHONE';
export const SET_NAME = 'SET_NAME';
export const SET_EMAIL = 'SET_EMAIL';
export const VALIDATE_FORM = 'VALIDATE_FORM';

export const HomeActionsConstance = {
    setEmail: 'agencyBasicRegister/setEmail',
};

export interface IHomeState {
    email: string;
    emailError: string | undefined;
}

export type HomeValidationResults = {
    isFormValid: boolean;
    emailValid: ValidationResult<unknown>;
};
