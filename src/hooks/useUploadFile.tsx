import { UploadTask } from 'firebase/storage'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { UploadImage } from '../firebase/storage'

export default function useUploadFile(plid:string) {

  //const [task, settask] = useState<UploadTask | null>(null)
  const [imgURL, setimgURL] = useState("")
  const [progress, setProgress] = useState(0)
  
    /* --------------------
    Handle Input File
----------------------- */
const handleInputFileChange = (
  e: ChangeEvent<HTMLInputElement>
): void => {
  console.log("en handleInputFileChange", e.eventPhase);
  
  if (e.target.files !== null) {
    const file: File = e.target.files[0]
    UploadImage(file, plid, setProgress, setimgURL)
    //settask(task)
  }
}
/* 
const handleInputClick : React.MouseEventHandler = (
  e : React.MouseEvent<HTMLInputElement, MouseEvent>) => {
  const element = e.target as HTMLInputElement
  element.value = ''
}
 */

/* -------------------------
      UseEffect
-------------------------- */
/* useEffect(() => {
  if (task) {
    const onProgress = () => {}
    const onError = (e) => {
      console.log(e)
    }
    const onComplete = () => {
      console.log('transferencia completada')
      task.snapshot.ref
        .getDownloadURL()
        .then(setimgURL)
        .catch((err) => console.error(err))
    }
    task.on('state_changed', onProgress, onError, onComplete)
  }
}, [task])
 */  
  return {progress, imgURL, handleInputFileChange}
}