// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TaskProvider from './context/TaskContext.jsx'
import AlertProvider from './context/AlertContext.jsx'

createRoot(document.getElementById('root')).render(
    <>
        <TaskProvider>
            <AlertProvider>
                <App />
            </AlertProvider>
        </TaskProvider>
    </>
)
