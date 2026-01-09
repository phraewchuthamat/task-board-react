import { createContext, useState, useRef } from 'react'

const ALERT_TIME = 3000
const initialState = {
    text: '',
    type: '',
}

const AlertContext = createContext({
    ...initialState,
    setAlert: () => {},
})

export default function AlertProvider({ children }) {
    const [text, setText] = useState('')
    const [type, setType] = useState('')

    const timeoutRef = useRef(null)

    const setAlert = (text, type) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        setText(text)
        setType(type)

        timeoutRef.current = setTimeout(() => {
            setText('')
            setType('')
        }, ALERT_TIME)
    }

    return (
        <AlertContext.Provider value={{ text, type, setAlert }}>
            {children}
        </AlertContext.Provider>
    )
}

export { AlertContext }
