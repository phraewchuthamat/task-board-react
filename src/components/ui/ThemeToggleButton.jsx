import { useTheme } from '../../hooks/useTheme'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'

const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme()

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle Dark Mode"
            className={`
                relative p-2 rounded-full transition-all duration-300 ease-in-out
                hover:scale-110 active:scale-95 shadow-sm
                
                ${
                    theme === 'light'
                        ? 'bg-white text-slate-500 hover:text-indigo-600 hover:bg-slate-100 border border-slate-200'
                        : ''
                }
                

                ${
                    theme === 'dark'
                        ? 'bg-slate-800 text-slate-400 hover:text-yellow-400 border border-slate-700'
                        : ''
                }
            `}
        >
            <div className="relative w-5 h-5">
                {theme === 'light' ? (
                    <MoonIcon className="w-5 h-5 animate-in fade-in zoom-in duration-300" />
                ) : (
                    <SunIcon className="w-5 h-5 animate-in fade-in zoom-in duration-300" />
                )}
            </div>
        </button>
    )
}

export default ThemeToggleButton
