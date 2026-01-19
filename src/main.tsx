import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import TaskProvider from './contexts/TaskContext'
import AlertProvider from './contexts/AlertContext'
import ThemeProvider from './contexts/ThemeContext'
import ColumnProvider from './contexts/ColumnContext'

const rootElement = document.getElementById('root')

createRoot(rootElement!).render(
    <ThemeProvider>
        <ColumnProvider>
            <TaskProvider>
                <AlertProvider>
                    <App />
                </AlertProvider>
            </TaskProvider>
        </ColumnProvider>
    </ThemeProvider>
)
