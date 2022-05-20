import { useState } from 'react'

interface useToogleInterface {
    value : boolean,
    toggleValue : (value: boolean) => void
}

export default function useToggle(initialState : boolean): useToogleInterface {
    const [value, setvalue] = useState(initialState)

    const toggleValue = (value : boolean) : void=> {
        const output : boolean = value ? false : true
        setvalue(output)
    }
    
    return {value, toggleValue} 
}