import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TaskProvider from './context/TaskContext.jsx'
import AlertProvider from './context/AlertContext.jsx'
import ThemeProvider from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
    <ThemeProvider>
        <TaskProvider>
            <AlertProvider>
                <App />
            </AlertProvider>
        </TaskProvider>
    </ThemeProvider>
)
