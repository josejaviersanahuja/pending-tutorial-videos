import {getMessaging, getToken, onMessage} from 'firebase/messaging'
import { PUBLIC_VAPID_KEY } from './config';
import {app} from './init'
import {db} from './firestore'
import { doc, setDoc } from 'firebase/firestore';

const messaging = getMessaging(app)

export const preguntarPermisos = () => {
  Notification.requestPermission()
  .then(permission => {
    if (permission === "denied") {
        console.log("Permission wasn't granted. Allow a retry.");
        return;
    } else if (permission === "default") {
        console.log("The permission request was dismissed.");
        return;
    }
    return getToken(messaging,{vapidKey:PUBLIC_VAPID_KEY})
  })
  .then(token=>{
    // if token, send to firestore else log no token available
    if (token) {
      console.log("user token: ", token);
      setDoc(doc(db, 'tokens', token), {"token":token})
    } else {
      console.log("no hay token");
      
    }
  })
  .catch(error => {
    console.error(error);
  })
};

export const suscribeMessaging = () => {
  return onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    // ...TODO
  });  
}

