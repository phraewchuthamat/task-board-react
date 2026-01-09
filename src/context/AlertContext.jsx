import { createContext, useState, useRef } from 'react' // 1. เพิ่ม useRef

const ALERT_TIME = 5000
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

    // 2. สร้าง ref ไว้เก็บ ID ของ timer
    const timeoutRef = useRef(null)

    const setAlert = (text, type) => {
        // 3. ถ้ามี timer เก่าค้างอยู่ ให้ทำลายทิ้งก่อน!
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }

        setText(text)
        setType(type)

        // 4. ตั้ง timer ใหม่ และเก็บ ID ไว้
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
