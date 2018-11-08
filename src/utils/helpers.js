import { AsyncStorage, ToastAndroid, Platform } from 'react-native';
import { Toast } from 'native-base';
import { Notifications, Permissions } from 'expo'; 
import { AsyncStorageKey } from './keys';

export const NOTIFICATION_KEY = 'flashCards:notifications';


export const createguid = () => {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};


export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
  .then(Notifications.cancelAllScheduledNotificationsAsync);
}

 
export function createNotification() {
  return {
    title: ' Do a quiz!',
    body: "👋 don't forget do your quiz for today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  };
}

export function sendToast(text) {
  Platform.OS === 'ios' ?      
  Toast.show({
    text
  })
  :
  ToastAndroid.show(text, ToastAndroid.SHORT);
}

export async function setDeckData(decks) {    
  for (const id of Object.keys(decks)) {
    await AsyncStorage.mergeItem(AsyncStorageKey, JSON.stringify({
      [id]: decks[id]
    }));
  }  
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day'
                }
              );

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          });
      }
    });
};