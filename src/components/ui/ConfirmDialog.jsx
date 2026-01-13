import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'

function ConfirmDialog({ isOpen, onClose, onConfirm, title, message }) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div
                onPointerDown={(e) => e.stopPropagation()}
                className="bg-app-surface rounded-xl shadow-2xl w-full max-w-md p-6 transform transition-all duration-300 scale-100 opacity-100"
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-full bg-rose-500/10 text-rose-500">
                            <ExclamationTriangleIcon className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-app-text">
                            {title}
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-lg text-app-subtle hover:text-app-text hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                <p className="text-sm text-app-subtle mb-6">{message}</p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-200 dark:bg-gray-700 text-app-text hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-sm font-medium rounded-lg bg-rose-600 text-white hover:bg-rose-700 transition-colors shadow-md"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDialog
