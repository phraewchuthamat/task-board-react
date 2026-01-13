import {
    CheckCircleIcon,
    XCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
} from '@heroicons/react/24/outline'

export const ALERT_CONFIG = {
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
