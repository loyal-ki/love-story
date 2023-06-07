/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import {act, renderHook} from '@testing-library/react-hooks';
import * as Redux from 'react-redux';

import store from '@app/store';
import {useViewModel} from '@screens/login/login.view-model';

const renderHookViewModel = (wrapper: any) => {
    const {result, waitFor} = renderHook(() => useViewModel(), {
        wrapper,
    });

    return {result, waitFor};
};

describe('Testing all the logic inside a login.view-model.', () => {
    const useDispatchMock = jest.spyOn(Redux, 'useDispatch');

    beforeEach(() => {
        useDispatchMock.mockClear();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    const wrapper: React.FC<any> = ({children}) => (
        <Redux.Provider store={store}>{children}</Redux.Provider>
    );

    test('test onLoginChange', () => {
        const {result} = renderHookViewModel(wrapper);

        console.log(result.current.state);

        act(() => {
            result.current.onLoginChange('test.com');
        });

        console.log(result.current.state);

        expect(result.current.state.email).toBe('test.com');
        expect(result.current.state.emailError).toBe(
            'home.floating_input_email_message_error_invalid_email'
        );
    });
});
