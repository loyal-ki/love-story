import {UserRepository} from './user';
import {PreferencesRepository} from './preferences';

export const preferencesRepository = () => {
    return PreferencesRepository;
};

export const userRepository = () => {
    return UserRepository;
};
