import  { useCallback, useRef, useEffect } from 'react'

interface useTimeoutInterface {
    reset:()=>void,
    clear:()=>void
}

export default function useTimeout(callback : ()=> void, delay:number): useTimeoutInterface {

    // Nuestro callback o acción a ejecutar es única. si quieres una que cambie, hay que usar otro hook
    // eso es porque este hook está diseñado para eficiencia y no para generalizaciones.
    const callbackRef = useRef(callback)

    // representa el current timeout 
    const timeoutRef = useRef<undefined | NodeJS.Timeout>()

    // este useEffect junto al useRef del callback Ref crean la misma funcionalidad que un useCallback en el componente TimeoutComponent. 
    // impiden que se modifique el callbackRef
    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    // inicia el timeout
    const set = useCallback(()=>{
        timeoutRef.current = setTimeout(()=>{
            callbackRef.current()
        }, delay)
    }, [delay])

    // limpia el timeout
    const clear = useCallback(()=>{
        timeoutRef.current && clearTimeout(timeoutRef.current)
    },[])

    useEffect(() => {
        set()
        return () => {
            clear()
        }
    }, [delay, set, clear])

    // reinicia el timemout
    const reset = useCallback(
        () => {
            clear()
            set()
        },
        [clear, set],
    )

    return {reset, clear}
}