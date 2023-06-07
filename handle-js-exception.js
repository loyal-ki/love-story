import * as Sentry from '@sentry/react-native';
import {Alert} from 'react-native';
import {setJSExceptionHandler} from 'react-native-exception-handler';
import RNRestart from 'react-native-restart';

const allowInDevMode = false;

setJSExceptionHandler((error, isFatal) => {
    Sentry.captureException(error.originalError ?? error);

    if (isFatal) {
        Alert.alert(
            'Ooops, something went wrong',
            'We have reported this to our team! \nRestart the app and try again. \nIf this continues - please Reset the application.',
            [
                {
                    text: 'Restart',
                    style: 'cancel',
                    onPress: () => RNRestart.Restart(),
                },
                {
                    text: 'Reset',
                    style: 'destructive',
                    onPress: () => {
                        RNRestart.Restart();
                    },
                },
            ]
        );
    }
}, allowInDevMode);
