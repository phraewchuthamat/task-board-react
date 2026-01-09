import Alert from '@mui/material/Alert'
import useAlert from '../../hooks/useAlert'

const AlertPopup = () => {
    const { text, type } = useAlert()

    if (!text || !type) return null

    return (
        <Alert
            severity={type}
            onClose={() => {}}
            sx={{
                position: 'fixed',
                top: '40px',
                right: '20px',
                zIndex: 9999,
                boxShadow: 3,
                minWidth: '300px',
            }}
        >
            {text}
        </Alert>
    )
}

export default AlertPopup
