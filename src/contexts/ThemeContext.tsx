import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
    theme: Theme
    isDark: boolean
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeProviderProps {
    children: ReactNode
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(() => {
        const saved = localStorage.getItem('theme')

        if (saved === 'light' || saved === 'dark') {
            return saved as Theme
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
    })

    useEffect(() => {
        localStorage.setItem('theme', theme)

        if (theme === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [theme])

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
    }

    return (
        <ThemeContext.Provider
            value={{
                theme,
                isDark: theme === 'dark',
                toggleTheme,
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a Theme a ThemeProvider')
    }
    return context
}

export { ThemeContext }
