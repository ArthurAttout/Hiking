import { Platform, AsyncStorage, AppState } from 'react-native';

import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType, NotificationActionType, NotificationActionOption, NotificationCategoryOption} from "react-native-fcm";

export function registerAppListener(){
    FCM.on(FCMEvent.Notification, notif => {
        console.log(notif['startGameNow']);

        FCM.presentLocalNotification({
            title: notif.fcm.title,
            body: notif.fcm.body,
            show_in_foreground: true});
    });
}

