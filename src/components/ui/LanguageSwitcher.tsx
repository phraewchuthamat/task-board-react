import { useLanguage } from '../../contexts/LanguageContext'

export default function LanguageSwitcher() {
    const { language, toggleLanguage } = useLanguage()

    return (
        <button
            onClick={toggleLanguage}
            className="
                px-3 py-1 rounded-md text-sm font-medium transition-all
                border border-app-border
                hover:bg-app-primary/10 hover:text-app-primary
                active:scale-95 cursor-pointer
            "
        >
            {language === 'en' ? 'EN' : 'TH'}
        </button>
    )
}
