import { Disclosure } from '@headlessui/react'
import ThemeToggleButton from './ui/ThemeToggleButton'

export default function Navbar() {
    return (
        <Disclosure
            as="nav"
            className="
                relative 
                bg-theme-light-surface dark:bg-theme-dark-surface 
                transition-colors duration-500 
                
                after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px 
                after:bg-theme-light-accent dark:after:bg-white/10
                shadow-sm
            "
        >
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div
                        className="
                        flex space-x-4 text-2xl font-bold transition-colors duration-300
                        text-theme-light-text dark:text-theme-dark-text
                    "
                    >
                        Kanban Board
                    </div>

                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-4">
                        <ThemeToggleButton />
                    </div>
                </div>
            </div>
        </Disclosure>
    )
}
