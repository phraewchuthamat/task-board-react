import { createContext, useContext, useState, ReactNode } from 'react'
import { Language, TranslationKey, translations } from '../utils/i18n'

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    trans: (key: TranslationKey) => string
    toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined
)

export default function LanguageProvider({
    children,
}: {
    children: ReactNode
}) {
    const [language, setLanguage] = useState<Language>('en')

    const toggleLanguage = () => {
        setLanguage((prev) => (prev === 'en' ? 'th' : 'en'))
    }

    const trans = (key: TranslationKey) => {
        return translations[language][key]
    }

    return (
        <LanguageContext.Provider
            value={{ language, setLanguage, trans, toggleLanguage }}
        >
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => {
    const context = useContext(LanguageContext)

    if (!context) {
        throw new Error()
    }

    return context
}
