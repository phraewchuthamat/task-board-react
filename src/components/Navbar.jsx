import { Disclosure } from '@headlessui/react'
import ThemeToggleButton from './ui/ThemeToggleButton'

export default function Navbar() {
    return (
        <Disclosure
            as="nav"
            className="sticky top-4 z-50 mx-4 mt-2 rounded-2xl bg-theme-light-surface/80 dark:bg-theme-dark-surface/80 backdrop-blur-md shadow-lg border border-theme-light-accent/30 dark:border-theme-dark-text/20 transition-all duration-300"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-xl font-bold tracking-tight text-gray-800 dark:text-theme-dark-card">
                            Kanban Board
                        </span>
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggleButton />
                    </div>
                </div>
            </div>
        </Disclosure>
    )
}
