import notifee, {
    AndroidImportance,
    AndroidNotificationSetting,
    Notification,
    TimestampTrigger,
    TriggerType,
} from '@notifee/react-native';
import {FirebaseMessagingTypes} from '@react-native-firebase/messaging';

import {logInfo} from '@app/utils';
import {Config} from '@constants';

class PushNotificationService {
    createAndroidNotifChannel = async () => {
        await notifee.requestPermission();
        await notifee.deleteChannel(Config.ANDROID_CHANNEL_ID);
        await notifee.createChannel({
            id: Config.ANDROID_CHANNEL_ID,
            name: Config.ANDROID_CHANNEL_ID,
            lights: false,
            vibration: true,
            importance: AndroidImportance.DEFAULT,
            sound: 'default',
        });

        const channel = await notifee.getChannel(Config.ANDROID_CHANNEL_ID);
        if (channel?.blocked) {
            logInfo(`Channel ${Config.ANDROID_CHANNEL_ID} is disabled`);
        } else {
            logInfo(`Channel ${Config.ANDROID_CHANNEL_ID} is enabled`);
        }
    };

    clearAllNotifications = async () => {
        logInfo('Clearing all notifications');
        await notifee.cancelAllNotifications();
    };

    checkAndroidAlarmPermissionSettings = async () => {
        const settings = await notifee.getNotificationSettings();
        if (settings.android.alarm !== AndroidNotificationSetting.ENABLED) {
            await notifee.openAlarmPermissionSettings();
        }
    };

    createTimestampNotification = async (date: Date, notification: Notification): Promise<void> => {
        await this.createAndroidNotifChannel();
        await this.checkAndroidAlarmPermissionSettings();
        const trigger: TimestampTrigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: date.getTime(),
        };

        const createdNotificationId = await notifee.createTriggerNotification(
            notification,
            trigger
        );

        const triggerNotifs = await notifee.getTriggerNotifications();
        const createdNotif = triggerNotifs.filter(
            t => t.notification.id === createdNotificationId
        )[0];

        logInfo(createdNotif);
    };

    createDisplayNotification = async (message: FirebaseMessagingTypes.RemoteMessage) => {
        await this.createAndroidNotifChannel();
        await notifee.displayNotification({
            title: message.notification?.title,
            body: message.notification?.body ?? '',
            android: {
                channelId: Config.ANDROID_CHANNEL_ID,
                pressAction: {
                    id: 'default',
                },
            },
        });
    };

    // currently only used for testing, no functionality uses this yet.
    displayNotification = async () => {
        await this.createAndroidNotifChannel();
        await notifee.displayNotification({
            title: 'Test notification',
            android: {
                channelId: Config.ANDROID_CHANNEL_ID,
                pressAction: {
                    id: 'default',
                },
            },
        });
    };
}

export default new PushNotificationService();
