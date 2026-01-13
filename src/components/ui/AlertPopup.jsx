import useAlert from '../../hooks/useAlert'
import {
    CheckCircleIcon,
    XCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { useEffect, useState, useRef } from 'react'

const AlertPopup = () => {
    const { text, type, setAlert } = useAlert()
    const [isVisible, setIsVisible] = useState(false)
    const closeTimerRef = useRef(null)

    const handleClose = () => {
        setIsVisible(false)

        closeTimerRef.current = setTimeout(() => {
            if (setAlert) setAlert('', '')
            closeTimerRef.current = null
        }, 300)
    }

    useEffect(() => {
        if (text && type) {
            if (closeTimerRef.current) {
                clearTimeout(closeTimerRef.current)
                closeTimerRef.current = null
            }
            setIsVisible(true)
            const autoCloseTimer = setTimeout(() => {
                handleClose()
            }, 3000)
            return () => clearTimeout(autoCloseTimer)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text, type])

    useEffect(() => {
        return () => {
            if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
        }
    }, [])

    if (!text || !type) return null

    const config = {
        success: {
            icon: CheckCircleIcon,
            color: 'text-emerald-500 dark:text-emerald-400',
            border: 'border-l-emerald-500',
            bgIcon: 'bg-emerald-100 dark:bg-emerald-900/30',
        },
        error: {
            icon: XCircleIcon,
            color: 'text-rose-500 dark:text-rose-400',
            border: 'border-l-rose-500',
            bgIcon: 'bg-rose-100 dark:bg-rose-900/30',
        },
        warning: {
            icon: ExclamationTriangleIcon,
            color: 'text-amber-500 dark:text-amber-400',
            border: 'border-l-amber-500',
            bgIcon: 'bg-amber-100 dark:bg-amber-900/30',
        },
        info: {
            icon: InformationCircleIcon,
            color: 'text-blue-500 dark:text-blue-400',
            border: 'border-l-blue-500',
            bgIcon: 'bg-blue-100 dark:bg-blue-900/30',
        },
    }

    const { icon: Icon, color, border, bgIcon } = config[type] || config.info

    return (
        <div
            className={`
                fixed top-6 right-6 z-[9999]
                flex items-center gap-4 p-4 min-w-[320px] max-w-md
                /* ใช้ bg-app-surface และ border-app-border แทน glass/สีตายตัว */
                rounded-xl bg-app-surface border border-app-border ${border}
                shadow-xl shadow-black/10 /* ปรับเงาให้ดูดีขึ้น */
                transition-all duration-300 ease-out transform
                ${
                    isVisible
                        ? 'translate-y-0 opacity-100 scale-100'
                        : '-translate-y-4 opacity-0 scale-95 pointer-events-none'
                }
            `}
        >
            <div className={`p-2 rounded-full shrink-0 ${bgIcon}`}>
                <Icon className={`w-6 h-6 ${color}`} />
            </div>

            <div className="flex-1 pt-0.5">
                <h4 className={`text-sm font-bold capitalize mb-0.5 ${color}`}>
                    {type}
                </h4>
                <p className="text-sm font-medium text-app-subtle leading-snug">
                    {text}
                </p>
            </div>

            <button
                onClick={handleClose}
                className="p-1 rounded-lg text-app-subtle hover:text-app-text hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
                <XMarkIcon className="w-5 h-5" />
            </button>
        </div>
    )
}

export default AlertPopup
