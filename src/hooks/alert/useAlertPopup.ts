import { useAlert } from '../../contexts/AlertContext'

export default function useAlertPopup() {
    const { text, type, setAlert } = useAlert()

    const visible = Boolean(text && type)

    return {
        text,
        type,
        visible,
        close: () => setAlert('', ''),
    }
}
