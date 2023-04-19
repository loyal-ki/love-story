import messaging, {FirebaseMessagingTypes} from '@react-native-firebase/messaging';
import {Platform} from 'react-native';

import {logInfo} from '@app/utils';

import PushNotificationService from './push_notification';

class FCMService {
    private messagingRef!: ReturnType<typeof messaging>;

    init = async () => {
        this.messagingRef = messaging();
        if (Platform.OS === 'ios') {
            await this.requestUserPermissionOnIOS();
        }

        this.messageListener();
        this.registerDeviceForRemoteMessages();
        return true;
    };

    messageListener() {
        this.messagingRef.onMessage(this.onMessageReceived);
        this.messagingRef.setBackgroundMessageHandler(this.onMessageReceived);
    }

    registerDeviceForRemoteMessages = async (): Promise<void> => {
        const token = await messaging().getToken();
        logInfo(token);
    };

    async onMessageReceived(message: FirebaseMessagingTypes.RemoteMessage) {
        logInfo(message);
        await PushNotificationService.createDisplayNotification(message);
    }

    requestUserPermissionOnIOS = async (): Promise<boolean> => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        logInfo(`User permission for notifications: ${enabled ? 'Authorized' : 'Not given'}`);

        return enabled;
    };
}

export default new FCMService();
