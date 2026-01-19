import {
    CheckCircleIcon,
    XCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
} from '@heroicons/react/24/outline'
import { AlertType } from './../../contexts/AlertContext'

interface AlertConfigItem {
    icon: React.ElementType
    color: string
    bgIcon: string
}

export const ALERT_CONFIG: Record<Exclude<AlertType, ''>, AlertConfigItem> = {
    success: {
        icon: CheckCircleIcon,
        color: 'text-emerald-500 dark:text-emerald-400',
        bgIcon: 'bg-emerald-100 dark:bg-emerald-900/30',
    },
    error: {
        icon: XCircleIcon,
        color: 'text-rose-500 dark:text-rose-400',
        bgIcon: 'bg-rose-100 dark:bg-rose-900/30',
    },
    warning: {
        icon: ExclamationTriangleIcon,
        color: 'text-amber-500 dark:text-amber-400',
        bgIcon: 'bg-amber-100 dark:bg-amber-900/30',
    },
    info: {
        icon: InformationCircleIcon,
        color: 'text-blue-500 dark:text-blue-400',
        bgIcon: 'bg-blue-100 dark:bg-blue-900/30',
    },
}
