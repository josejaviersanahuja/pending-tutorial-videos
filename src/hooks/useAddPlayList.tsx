import React, { ChangeEvent, useState } from 'react'

export default function useAddPlayList() {

  const [nameValue, setNameValue] = useState("")
  const [textAreaValue, setTextAreaValue] = useState("")
  const [fileValue, setFileValue] = useState("")

  const handleName = (e:ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value)
  }

  const handleTexteArea = (e:ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.target.value)    
  }

  const handleImage = (e:ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setFileValue(e.target.value)
  }

  const reset = () => {
    setNameValue("")
    setFileValue("")
    setTextAreaValue("")
  }
  return {nameValue, textAreaValue, handleName, handleImage, handleTexteArea, reset}
}