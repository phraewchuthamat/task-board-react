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

    // 2. แล้วค่อยเขียน useEffect ทีหลัง
    useEffect(() => {
        if (text && type) {
            if (closeTimerRef.current) {
                clearTimeout(closeTimerRef.current)
                closeTimerRef.current = null
            }

            setIsVisible(true)

            // ตอนนี้เรียกใช้ handleClose ได้แล้ว เพราะประกาศไว้ข้างบนแล้ว
            const autoCloseTimer = setTimeout(() => {
                handleClose()
            }, 3000)

            return () => clearTimeout(autoCloseTimer)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text, type]) // เพิ่ม comment เพื่อข้าม warning เรื่อง dependency (ถ้ามี)

    // 3. Cleanup Effect
    useEffect(() => {
        return () => {
            if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
        }
    }, [])

    if (!text || !type) return null

    // ... ส่วนแสดงผล (Config และ Return) เหมือนเดิม ...
    const config = {
        success: {
            icon: CheckCircleIcon,
            color: 'text-emerald-600 dark:text-emerald-400',
            border: 'border-l-emerald-500',
            bgIcon: 'bg-emerald-100 dark:bg-emerald-900/50',
        },
        error: {
            icon: XCircleIcon,
            color: 'text-rose-600 dark:text-rose-400',
            border: 'border-l-rose-500',
            bgIcon: 'bg-rose-100 dark:bg-rose-900/50',
        },
        warning: {
            icon: ExclamationTriangleIcon,
            color: 'text-amber-600 dark:text-amber-400',
            border: 'border-l-amber-500',
            bgIcon: 'bg-amber-100 dark:bg-amber-900/50',
        },
        info: {
            icon: InformationCircleIcon,
            color: 'text-blue-600 dark:text-blue-400',
            border: 'border-l-blue-500',
            bgIcon: 'bg-blue-100 dark:bg-blue-900/50',
        },
    }

    const { icon: Icon, color, border, bgIcon } = config[type] || config.info

    return (
        <div
            className={`
                fixed top-6 right-6 z-[9999]
                flex items-center gap-4 p-4 min-w-[320px] max-w-md
                rounded-2xl
                glass border-l-4 ${border}
                shadow-2xl shadow-black/10
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
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-snug">
                    {text}
                </p>
            </div>

            <button
                onClick={handleClose}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
                <XMarkIcon className="w-5 h-5" />
            </button>
        </div>
    )
}

export default AlertPopup
