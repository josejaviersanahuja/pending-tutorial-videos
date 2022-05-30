import React, { ChangeEvent, FormEvent, useState } from 'react'

type Props = {
  handleSubmit : (e:FormEvent<HTMLFormElement>, value: string)=> void
}

export default function Form({handleSubmit}: Props) {

  const [value, setValue] = useState("")
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <form onSubmit={(e) => {handleSubmit(e, value); setValue("")}}>
        <input 
          value={value}
          onChange={handleChange}
          type="text"
          placeholder='Busca una playlist'
        />
        <input 
          type="submit"
          value="Buscar"
        />
      </form>
  )
}