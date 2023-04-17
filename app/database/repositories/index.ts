import {PreferencesRepository} from './preferences';
import {UserRepository} from './user';

export const preferencesRepository = () => {
    return PreferencesRepository;
};

export const userRepository = () => {
    return UserRepository;
};
