/* eslint-disable no-undef */
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
firebase.initializeApp({
  apiKey: "AIzaSyAVUdgAeLT4NAE7NYfbUo32WTLiLt1cmyQ",
  authDomain: "playlists-tutoriales.firebaseapp.com",
  projectId: "playlists-tutoriales",
  storageBucket: "playlists-tutoriales.appspot.com",
  messagingSenderId: "498497031068",
  appId: "1:498497031068:web:a1428364052f29bab65659",
  measurementId: "G-68Y61KL5SJ"
});

const messaging = firebase.messaging()

messaging.usePublicVapidKey(
  "BOajvjsZ_Y_rM_MuQ6H05yQFLWAipL9ADK9adnnNei2-f1xXFBhYC1qjaSoJbvCLSmrx3a5yAOPb9LndUUjR3kw"
)

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Se ha creado un nuevo playlist';
  const notificationOptions = {
    body: `Es sobre ${payload.data.titulo}. ${payload.data.descripcion}`,
    icon: '/firebase-logo.png'
  };

  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(notificationTitle,
    notificationOptions);
});