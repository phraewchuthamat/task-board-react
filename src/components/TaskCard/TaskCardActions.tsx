import { useState, memo, MouseEvent } from 'react'
import { XMarkIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { Task } from '../../utils/storage'
import ConfirmDialog from '../dialog/ConfirmDialog'

interface TaskCardActionsProps {
    task: Task
    onEdit?: (task: Task) => void
    onDelete?: (id: string) => void
}

function TaskCardActions({ task, onEdit, onDelete }: TaskCardActionsProps) {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)

    const handleConfirmDelete = () => {
        onDelete?.(task.id)
        setIsConfirmOpen(false)
    }

    const stopPropagation = (e: MouseEvent) => {
        e.stopPropagation()
    }

    return (
        <>
            <div className="absolute top-2 right-2 flex gap-1 text-app-subtle">
                <button
                    onPointerDown={stopPropagation}
                    onClick={(e) => {
                        stopPropagation(e)
                        onEdit?.(task)
                    }}
                    className="p-1 rounded hover:bg-app-bg hover:text-app-text transition-colors"
                    title="Edit Task"
                >
                    <PencilSquareIcon className="w-4 h-4" />
                </button>

                <button
                    onPointerDown={stopPropagation}
                    onClick={(e) => {
                        stopPropagation(e)
                        setIsConfirmOpen(true)
                    }}
                    className="p-1 rounded hover:bg-red-500/10 hover:text-red-500 transition-colors"
                    title="Delete Task"
                >
                    <XMarkIcon className="w-4 h-4" />
                </button>
            </div>

            <ConfirmDialog
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Confirm deletion"
                message={`Are you sure you want to delete "${task.title}"?`}
            />
        </>
    )
}

export default memo(TaskCardActions)
