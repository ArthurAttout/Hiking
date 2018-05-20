import { Platform, AsyncStorage, AppState } from 'react-native';

import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType, NotificationActionType, NotificationActionOption, NotificationCategoryOption} from "react-native-fcm";

AsyncStorage.getItem('lastNotification').then(data=>{
    if(data){
        // if notification arrives when src is killed, it should still be logged here
        console.log('last notification', JSON.parse(data));
        AsyncStorage.removeItem('lastNotification');
    }
});

AsyncStorage.getItem('lastMessage').then(data=>{
    if(data){
        // if notification arrives when src is killed, it should still be logged here
        console.log('last message', JSON.parse(data));
        AsyncStorage.removeItem('lastMessage');
    }
});

export function registerKilledListener(){
    // these callback will be triggered even when src is killed
    /*FCM.on(FCMEvent.Notification, notif => {
        AsyncStorage.setItem('lastNotification', JSON.stringify(notif));
        if(notif.opened_from_tray){
            if(notif._actionIdentifier === 'com.myidentifi.fcm.text.reply'){
                if(AppState.currentState !== 'background'){
                    alert('User replied '+ JSON.stringify(notif._userText));
                } else {
                    AsyncStorage.setItem('lastMessage', JSON.stringify(notif._userText));
                }
            }
            if(notif._actionIdentifier === 'com.myidentifi.fcm.text.view'){
                alert("User clicked View in App");
            }
            if(notif._actionIdentifier === 'com.myidentifi.fcm.text.dismiss'){
                alert("User clicked Dismiss");
            }
        }
    });*/
}

// these callback will be triggered only when src is foreground or background
export function registerAppListener(){
    FCM.on(FCMEvent.Notification, notif => {
        console.log("Notification", notif);
        FCM.presentLocalNotification({
            title: notif.fcm.title,
            body: notif.fcm.body,
            show_in_foreground: true});
    });
/*
    FCM.on(FCMEvent.RefreshToken, token => {
        console.log("TOKEN (refreshUnsubscribe)", token);
    });

    FCM.enableDirectChannel();
    FCM.on(FCMEvent.DirectChannelConnectionChanged, (data) => {
        console.log('direct channel connected' + data);
    });
    setTimeout(function() {
        FCM.isDirectChannelEstablished().then(d => console.log(d));
    }, 1000);*/
}

