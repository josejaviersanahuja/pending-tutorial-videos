import { ChangeEvent, useState } from 'react'
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
  if (e.target.files !== null) {
    const file: File = e.target.files[0]
    UploadImage(file, plid, setProgress, setimgURL)
  }
}
  
  return {progress, imgURL, handleInputFileChange}
}