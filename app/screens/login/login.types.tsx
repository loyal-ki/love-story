import {ValidationResult} from '@app/utils';

export const SET_EMAIL = 'LoginActionsConstance/SetEmail';

export const LoginActionsConstance = {
    setEmail: SET_EMAIL,
};

export interface IHomeState {
    email: string;
    emailError: string | undefined;
}

export type HomeValidationResults = {
    isFormValid: boolean;
    emailValid: ValidationResult<unknown>;
};
