//import  { FormEvent, useState } from 'react'
import ListsOfPlaylists from '../../../components/ListsOfPlaylists'
import { IUser } from '../../../interfaces'
//import Form from './Form'

type Props = {
  user : IUser | null
}

export default function SearchForm({user}: Props) {

  
  //const [searchValue, setSearchValue] = useState<string | undefined>(undefined)

  /* const handleSubmit = (e: FormEvent<HTMLFormElement>, value: string) => {
    e.preventDefault()
    value.trim().length > 2 && setSearchValue(value)
  } */

  return (<>
    <div className='searchform'>
      {/* <Form handleSubmit={handleSubmit} /> */}
    </div>
    <ListsOfPlaylists user={user} search={undefined}/>
  </>)
}