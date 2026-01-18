import { XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import useAlertPopup from '../../hooks/alert/useAlertPopup'
import { ALERT_CONFIG } from './alertConfig'

const AlertPopup = () => {
    const { text, type, visible, close } = useAlertPopup()

    if (!text || !type) return null

    const {
        icon: Icon,
        color,
        border,
        bgIcon,
    } = ALERT_CONFIG[type] || ALERT_CONFIG.info

    return (
        <div
            data-state={visible ? 'open' : 'closed'}
            className={clsx(
                'fixed top-6 right-6 z-[9999]',
                'flex items-center gap-4 p-4 min-w-[320px] max-w-md',
                'rounded-xl bg-app-surface border border-app-border shadow-xl',
                'transition-all duration-300 ease-out transform',
                border,
                visible
                    ? 'translate-y-0 opacity-100 scale-100'
                    : '-translate-y-4 opacity-0 scale-95 pointer-events-none'
            )}
        >
            <div className={clsx('p-2 rounded-full shrink-0', bgIcon)}>
                <Icon className={clsx('w-6 h-6', color)} />
            </div>

            <div className="flex-1">
                <h4 className={clsx('text-sm font-bold capitalize', color)}>
                    {type}
                </h4>
                <p className="text-sm text-app-subtle leading-snug">{text}</p>
            </div>

            <button
                onClick={close}
                className="p-1 rounded-lg text-app-subtle hover:text-app-text hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
                <XMarkIcon className="w-5 h-5" />
            </button>
        </div>
    )
}

export default AlertPopup
