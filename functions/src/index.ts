import {firestore} from "firebase-functions";
import {messaging} from "firebase-admin";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
//  });

exports.registrarTopico = firestore
    .document("/tokens/{id}")
    .onCreate((dataSnapshot) => {
      const token = dataSnapshot.data().token;
      const registrationTokens = [token];

      return messaging()
          .subscribeToTopic(registrationTokens, "NuevosPlaylists")
          .then(() => {
            return console.log("Adiciona correctamente al topico. TO DO?");
          })
          .catch((error) => {
            console.log("Error al registrar el token", error);
          });
    });

exports.enviarNotificacion = firestore
    .document("/playlists/{plid}")
    .onCreate((dataSnapshot) => {
      const name = dataSnapshot.data().name;
      const description = dataSnapshot.data().description;
      const mensaje = {
        data: {
          name: name,
          description: description,
        },
        topic: "NuevosPlaylists",
      };

      return messaging()
          .send(mensaje)
          .then(() => {
            return console.log("Mensaje enviado correctamente");
          })
          .catch((error) => {
            console.log("Error enviando mensaje ", error);
          });
    });
