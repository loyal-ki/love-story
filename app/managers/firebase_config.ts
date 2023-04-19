import firebase from '@react-native-firebase/app';
import {Platform} from 'react-native';

class FirebaseConfig {
    init = async () => {
        const androidCredentials = {
            clientId: '1:292821423690:android:510e15b2b1a38660fab8b3',
            appId: '1:292821423690:android:510e15b2b1a38660fab8b3',
            apiKey: 'AIzaSyAzyALlb9NwNk6m0XDQaPc8jc_tUn-pCVA',
            databaseURL: '',
            storageBucket: 'love-story-aa5f5.appspot.com',
            messagingSenderId: '292821423690',
            projectId: 'love-story-aa5f5',
        };

        const iosCredentials = {
            clientId: '292821423690-mufempgtkvkckuocfukpj7e2balgesjm.apps.googleusercontent.com',
            appId: '1:292821423690:ios:d30a947748b16078fab8b3',
            apiKey: 'AIzaSyAzyALlb9NwNk6m0XDQaPc8jc_tUn-pCVA',
            databaseURL: '',
            storageBucket: 'love-story-aa5f5.appspot.com',
            messagingSenderId: '292821423690',
            projectId: 'love-story-aa5f5',
            persistence: false,
        };
        await firebase.initializeApp(Platform.OS === 'ios' ? iosCredentials : androidCredentials);

        return true;
    };
}

export default new FirebaseConfig();
