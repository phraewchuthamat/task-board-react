import { Disclosure } from '@headlessui/react'
import ThemeToggleButton from './ui/ThemeToggleButton'
import LanguageSwitcher from './ui/LanguageSwitcher'
import { useLanguage } from '../contexts/LanguageContext'

export default function Navbar() {
    const { trans } = useLanguage()

    return (
        <Disclosure
            as="nav"
            className="relative bg-app-surface transition-colors duration-300 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:border-app-border"
        >
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex space-x-4 text-gray-900 dark:text-gray-300 text-2xl font-bold transition-colors duration-300">
                        {trans('app_title')}
                    </div>

                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-4">
                        <LanguageSwitcher />

                        <div className="h-6 w-[1px] bg-app-border mx-2 hidden sm:block"></div>

                        <ThemeToggleButton />
                    </div>
                </div>
            </div>
        </Disclosure>
    )
}
