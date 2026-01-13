import { useState } from 'react'
import { XMarkIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { useTask } from '../../../hooks/useTask'
import useAlert from '../../../hooks/useAlert'
import ConfirmDialog from '../ConfirmDialog'

export default function TaskCardActions({ task, onEdit }) {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const { removeFromTask } = useTask()
    const { setAlert } = useAlert()

    const handleDelete = () => {
        removeFromTask(task.id)
        setAlert('ลบข้อมูลสำเร็จ!', 'success')
        setIsConfirmOpen(false)
    }

    return (
        <>
            <div className="absolute top-2 right-2 flex gap-1 text-app-subtle">
                <button
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                        e.stopPropagation()
                        onEdit?.(task)
                    }}
                    className="p-1 rounded hover:bg-app-bg hover:text-app-text"
                >
                    <PencilSquareIcon className="w-4 h-4" />
                </button>

                <button
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                        e.stopPropagation()
                        setIsConfirmOpen(true)
                    }}
                    className="p-1 rounded hover:bg-red-500/10 hover:text-red-500"
                >
                    <XMarkIcon className="w-4 h-4" />
                </button>
            </div>

            <ConfirmDialog
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleDelete}
                title="Confirm deletion"
                message={`Are you sure you want to delete "${task.title}"?`}
            />
        </>
    )
}
