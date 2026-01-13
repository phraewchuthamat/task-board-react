import { useTheme } from '../../hooks/useTheme'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'

const ThemeToggleButton = () => {
    const { isDark, toggleTheme } = useTheme()

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
            className={`
                relative p-2 rounded-full transition-all duration-300 ease-in-out
                hover:scale-110 active:scale-95 
                bg-app-surface text-app-text border border-app-border
                hover:bg-gray-200 dark:hover:bg-gray-700
            `}
        >
            <div className="relative w-5 h-5">
                {isDark ? (
                    <SunIcon className="w-5 h-5 text-yellow-400" />
                ) : (
                    <MoonIcon className="w-5 h-5 text-indigo-600" />
                )}
            </div>
        </button>
    )
}

export default ThemeToggleButton
