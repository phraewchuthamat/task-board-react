import { useTheme } from '../../hooks/useTheme'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'

const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            onClick={toggleTheme}
            className={`
                flex items-center gap-2 border box-border font-medium leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none transition-colors duration-300
                ${
                    theme === 'light'
                        ? 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
                        : 'bg-gray-800 text-white border-gray-600 hover:bg-gray-700'
                }
            `}
        >
            {theme === 'light' ? (
                <MoonIcon className="w-5 h-5" />
            ) : (
                <SunIcon className="w-5 h-5" />
            )}
            {theme === 'light' ? 'Light' : 'Dark'} Mode
        </button>
    )
}

export default ThemeToggleButton
