import { memo } from 'react'
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

function TaskCard({ task, onEdit, isOverlay = false }) {
    const { removeFromTask } = useTask()
    const { setAlert } = useAlert()

    const { setNodeRef, attributes, listeners, transform, transition } =
        useSortable({ id: task.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    const handleDelete = (e) => {
        e.stopPropagation()
        if (window.confirm(`ลบ "${task.title}" ?`)) {
            removeFromTask(task.id)
            setAlert('ลบข้อมูลสำเร็จ!', 'error')
        }
    }

    const priorityColors = {
        high: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300 border-rose-200/50',
        medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200/50',
        low: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200/50',
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="relative rounded-xl p-4 cursor-grab active:cursor-grabbing bg-white dark:bg-slate-800 shadow-sm"
        >
            <div
                className={clsx(
                    'absolute top-2 right-2 flex gap-1',
                    isOverlay && 'pointer-events-none opacity-90'
                )}
            >
                <button
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={(e) => {
                        e.stopPropagation()
                        onEdit?.(task)
                    }}
                    className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700"
                >
                    <PencilSquareIcon className="w-4 h-4" />
                </button>

                <button
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={handleDelete}
                    className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/30"
                >
                    <XMarkIcon className="w-4 h-4" />
                </button>
            </div>

            <h3 className="font-semibold text-sm mb-1 pr-12">{task.title}</h3>

            <p className="text-xs opacity-70 mb-3 line-clamp-2">
                {task.description}
            </p>

            {task.createdAt && (
                <div className="flex items-center gap-1 text-[11px] opacity-50 mb-4">
                    <CalendarIcon className="w-3 h-3" />
                    {formatDate(task.createdAt)}
                </div>
            )}
            <span
                className={clsx(
                    'text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider',
                    priorityColors[task.priority] || priorityColors.low
                )}
            >
                {task.priority}
            </span>
        </div>
    )
}

export default memo(TaskCard)
