import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TaskProvider from './contexts/TaskContext.jsx'
import AlertProvider from './contexts/AlertContext.jsx'
import ThemeProvider from './contexts/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
    <ThemeProvider>
        <TaskProvider>
            <AlertProvider>
                <App />
            </AlertProvider>
        </TaskProvider>
    </ThemeProvider>
)
