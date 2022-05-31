import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Dispatch } from "react";
import {app} from './init'

const storage = getStorage(app);


// Create the file metadata
/** @type {any} */
const metadata = {
  contentType: 'image/jpeg'
};

export const UploadImage = (file : File, plid: string, setProgress : Dispatch<number>, setUrl : Dispatch<string>) => {
  // Upload file and metadata to the object 'images/{plid}.jpeg'
  console.log("esta aqui?", file.size);
  
  const storageRef = ref(storage, 'images/' + plid + '.jpeg');
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on('state_changed',
    /**
    * ONSNAPSHOT
    */
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done'); 
      setProgress(progress)
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
        }
    },
    /**
     * ONERROR
     */
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          alert("No hay permisos suficientes para subir este archivo")
          break;
        case 'storage/canceled':
          // User canceled the upload
          alert("Operación cancelada desde el cliente")
          break;
    
        // ...
    
        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          alert("Error 500 desde el servidor")
          break;
      }
    },
    /**
     * COMPLETED uploaded successfully, now we can get the download URL 
     */
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        setUrl(downloadURL)
      });
    }
  );

  // return uploadTask
}
