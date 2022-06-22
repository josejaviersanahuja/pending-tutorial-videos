
export const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER,
  appId: `1:${process.env.REACT_APP_MESSAGING_SENDER}:web:${process.env.REACT_APP_APPID}`,
  measurementId: "G-68Y61KL5SJ"
};

export const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY
export const PUBLIC_VAPID_KEY= process.env.REACT_APP_PUBLIC_VAPID_KEY
