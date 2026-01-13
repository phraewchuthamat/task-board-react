import { memo, useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useTask } from '../../hooks/useTask'
import {
    XMarkIcon,
    PencilSquareIcon,
    CalendarIcon,
} from '@heroicons/react/24/outline'
import useAlert from '../../hooks/useAlert'
import { formatDate } from '../../utils/utils'
import clsx from 'clsx'
import ConfirmDialog from './ConfirmDialog'

function TaskCard({ task, onEdit, isOverlay = false }) {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const { removeFromTask } = useTask()
    const { setAlert } = useAlert()

    const { setNodeRef, attributes, listeners, transform, transition } =
        useSortable({ id: task.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    const handleDeleteClick = (e) => {
        e.stopPropagation()
        setIsConfirmOpen(true)
    }

    const handleConfirmDelete = () => {
        removeFromTask(task.id)
        setAlert('ลบข้อมูลสำเร็จ!', 'success')
        setIsConfirmOpen(false)
    }

    const priorityColors = {
        high: 'bg-rose-500/10 text-rose-500 border-rose-500/30',
        medium: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
        low: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30',
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="relative rounded-lg p-4 cursor-grab active:cursor-grabbing bg-app-card shadow-md border border-app-border transition-shadow hover:shadow-lg"
        >
            <div
                className={clsx(
                    'absolute top-2 right-2 flex gap-1 text-app-subtle',
                    isOverlay && 'pointer-events-none opacity-90'
                )}
            >
                <button
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                        e.stopPropagation()
                        onEdit?.(task)
                    }}
                    className="p-1 rounded hover:bg-app-bg hover:text-app-text transition-colors"
                >
                    <PencilSquareIcon className="w-4 h-4" />
                </button>

                <button
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={handleDeleteClick}
                    className="p-1 rounded hover:bg-red-500/10 hover:text-red-500 transition-colors"
                >
                    <XMarkIcon className="w-4 h-4" />
                </button>
            </div>

            <h3 className="font-semibold text-sm mb-1 pr-12 text-app-text">
                {task.title}
            </h3>

            <p className="text-xs text-app-subtle mb-3 line-clamp-2">
                {task.description}
            </p>

            {task.createdAt && (
                <div className="flex items-center gap-1 text-[11px] text-app-subtle opacity-70 mb-4">
                    <CalendarIcon className="w-3 h-3" />
                    {formatDate(task.createdAt)}
                </div>
            )}
            <span
                className={clsx(
                    'text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider',
                    priorityColors[task.priority] || priorityColors.low
                )}
            >
                {task.priority}
            </span>
            <ConfirmDialog
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Confirm deletion"
                message={`Are you sure you want to confirm job deletion "${task.title}"?`}
            />
        </div>
    )
}

export default memo(TaskCard)
