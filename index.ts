import {LogBox} from 'react-native';
import {LoveStoryApp} from './app/initialize';
import {Navigation} from 'react-native-navigation';
import 'react-native-gesture-handler';

declare const global: {HermesInternal: null | {}};

if (__DEV__) {
    LogBox.ignoreLogs(['new NativeEventEmitter']);
}

if (global.HermesInternal) {
    // Polyfills required to use Intl with Hermes engine
    require('@formatjs/intl-getcanonicallocales/polyfill');
    require('@formatjs/intl-locale/polyfill');
    require('@formatjs/intl-pluralrules/polyfill');
    require('@formatjs/intl-numberformat/polyfill');
    require('@formatjs/intl-datetimeformat/polyfill');
    require('@formatjs/intl-datetimeformat/add-golden-tz');
}

Navigation.events().registerAppLaunchedListener(async () => {
    LoveStoryApp();
});
