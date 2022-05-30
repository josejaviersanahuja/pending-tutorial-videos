import { ChangeEvent, useState } from 'react'
import useToggle from './useToggle'

export default function useHandleForm() {

  const [nameValue, setNameValue] = useState("")
  const [textAreaValue, setTextAreaValue] = useState("")
  const [name2Value, setName2Value] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { value, toggleValue } = useToggle(false)
  const handleName = (e:ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value)
  }

  const handleTexteArea = (e:ChangeEvent<HTMLTextAreaElement>) => {
    setTextAreaValue(e.target.value)    
  }

  const handleName2 = (e:ChangeEvent<HTMLInputElement>) => {
    setName2Value(e.target.value)
  }

  const reset = () => {
    setNameValue("")
    setName2Value("")
    setTextAreaValue("")
  }

  return {
    nameValue, 
    textAreaValue, 
    handleName, 
    handleName2, 
    handleTexteArea, 
    name2Value, 
    reset,
    isLoading,
    setIsLoading,
    toggleValue,
    value
  }
}