import { useEffect, useRef } from 'react'
import useAlert from './useAlert'

export default function useAlertPopup() {
    const { text, type, setAlert } = useAlert()
    const timerRef = useRef(null)

    const visible = Boolean(text && type)

    useEffect(() => {
        if (!visible) return

        timerRef.current = setTimeout(() => {
            setAlert('', '')
        }, 3000)

        return () => clearTimeout(timerRef.current)
    }, [visible, setAlert])

    return {
        text,
        type,
        visible,
        close: () => setAlert('', ''),
    }
}
