/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/react-in-jsx-scope */
import {act, renderHook} from '@testing-library/react-hooks';
import * as Redux from 'react-redux';

import {UserLocaleContext} from '@app/context/locale';
import {ThemeContext, getDefaultThemeByAppearance} from '@app/context/theme';
import {useMount} from '@app/hooks';
import store from '@app/store';
import {useViewModel} from '@screens/settings/settings.view-model';

import {getIntlShape} from 'test/intl-setup';

const renderHookViewModel = (intlArgument: any, wrapper: any) => {
    const {result, waitFor} = renderHook(() => useViewModel(intlArgument), {
        wrapper,
    });

    return {result, waitFor};
};

const mockInitCallback = jest.fn();

const locale = 'vi';

const intl = getIntlShape(locale);

describe('Testing all the logic inside a settings.view-model.', () => {
    const useDispatchMock = jest.spyOn(Redux, 'useDispatch');

    const defaultLocale = 'en';

    const localeContext = {
        locale: defaultLocale,
        updateLocale: jest.fn().mockImplementation((value: string) => {
            localeContext.locale = value;
        }),
    };

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
        <Redux.Provider store={store}>
            <UserLocaleContext.Provider value={localeContext}>
                <ThemeContext.Provider
                    value={{theme: getDefaultThemeByAppearance(), updateTheme: value => {}}}>
                    {children}
                </ThemeContext.Provider>
            </UserLocaleContext.Provider>
        </Redux.Provider>
    );

    test('should call useMount only once', async () => {
        const {result} = renderHookViewModel(intl, wrapper);

        console.log(localeContext.locale);

        act(() => {
            localeContext.updateLocale('vi');
        });

        expect(result.current.updateLocale).toHaveBeenCalledTimes(1);

        const mockDispatch = jest.fn();

        useDispatchMock.mockReturnValue(mockDispatch);

        renderHook(() => useMount(mockInitCallback));

        expect(mockInitCallback).toHaveBeenCalledTimes(1);

        console.log(localeContext.locale);
    });

    test('test useChangeThemeMode method', () => {
        const {result} = renderHookViewModel(intl, wrapper);

        expect(result.current.state.isDarkModeEnable).toBe(false);

        act(() => {
            result.current.useChangeThemeMode();
        });

        const mockDispatch = jest.fn();

        useDispatchMock.mockReturnValue(mockDispatch);

        expect(result.current.state.isDarkModeEnable).toBe(true);
    });
});
