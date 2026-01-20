import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import TaskProvider from './contexts/TaskContext'
import AlertProvider from './contexts/AlertContext'
import ThemeProvider from './contexts/ThemeContext'
import ColumnProvider from './contexts/ColumnContext'
import LanguageProvider from './contexts/LanguageContext'

const rootElement = document.getElementById('root')

createRoot(rootElement!).render(
    <React.StrictMode>
        <ThemeProvider>
            <LanguageProvider>
                <ColumnProvider>
                    <TaskProvider>
                        <AlertProvider>
                            <App />
                        </AlertProvider>
                    </TaskProvider>
                </ColumnProvider>
            </LanguageProvider>
        </ThemeProvider>
    </React.StrictMode>
)
