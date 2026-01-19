import {
    createContext,
    useState,
    useRef,
    ReactNode,
    useCallback,
    useContext,
} from 'react'

const ALERT_TIME: number = 3000

export type AlertType = 'success' | 'error' | 'warning' | 'info' | ''

interface AlertState {
    text: string
    type: AlertType
}

interface AlertContextType extends AlertState {
    setAlert: (text: string, type: AlertType) => void
}

const AlertContext = createContext<AlertContextType | undefined>(undefined)

interface AlertProviderProps {
    children: ReactNode
}

export default function AlertProvider({ children }: AlertProviderProps) {
    const [text, setText] = useState<string>('')
    const [type, setType] = useState<AlertType>('')

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const setAlert = useCallback((text: string, type: AlertType) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        setText(text)
        setType(type)

        if (text) {
            timeoutRef.current = setTimeout(() => {
                setText('')
                setType('')
                timeoutRef.current = null
            }, ALERT_TIME)
        }
    }, [])

    return (
        <AlertContext.Provider value={{ text, type, setAlert }}>
            {children}
        </AlertContext.Provider>
    )
}

export const useAlert = () => {
    const context = useContext(AlertContext)
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider')
    }
    return context
}

export { AlertContext }
