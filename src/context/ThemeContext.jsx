import { createContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export default function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => {
        const savedMode = localStorage.getItem('theme')
        return savedMode || 'light'
    })

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
    }

    useEffect(() => {
        localStorage.setItem('theme', theme)
        const root = document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(theme)
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export { ThemeContext }
