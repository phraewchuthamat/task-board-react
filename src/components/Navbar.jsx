import { Disclosure } from '@headlessui/react'
import ThemeToggleButton from './ui/ThemeToggleButton'

export default function Navbar() {
    return (
        <Disclosure
            as="nav"
            className="
                sticky top-4 z-50 mx-4 mt-2 rounded-2xl
                glass transition-all duration-500
            "
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-blue-500 to-teal-400 text-white font-bold shadow-md shadow-blue-500/30">
                            KB
                        </div>
                        <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-slate-900 dark:from-white dark:to-slate-300">
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
