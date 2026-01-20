import { createPortal } from 'react-dom'
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Button from '../ui/Button'
import { useLanguage } from '../../contexts/LanguageContext'

interface ConfirmDialogProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    message: string
}

export default function ConfirmDialog({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
}: ConfirmDialogProps) {
    if (!isOpen) return null

    const { trans } = useLanguage()

    return createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            <div
                onPointerDown={(e) => e.stopPropagation()}
                className="relative bg-app-surface w-full max-w-md rounded-xl shadow-2xl overflow-hidden transform transition-all scale-100 opacity-100 border border-app-border"
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-1 rounded-full text-app-subtle hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    <XMarkIcon className="w-5 h-5" />
                </button>

                <div className="p-6">
                    <div className="flex gap-4">
                        <div className="flex-shrink-0">
                            <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                                <ExclamationTriangleIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
                            </div>
                        </div>

                        <div className="flex-1 pt-1">
                            <h3 className="text-lg font-bold text-app-text leading-6">
                                {title}
                            </h3>
                            <div className="mt-2">
                                <p className="text-sm text-app-subtle leading-relaxed">
                                    {message}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 flex justify-end gap-3 border-t border-app-border">
                    <Button variant="ghost" onClick={onClose}>
                        {trans('btn_cancel')}
                    </Button>
                    <Button
                        variant="danger"
                        onClick={onConfirm}
                        className="!bg-rose-600 hover:!bg-rose-700 text-white border-transparent"
                    >
                        {trans('btn_confirm')}
                    </Button>
                </div>
            </div>
        </div>,
        document.body
    )
}
