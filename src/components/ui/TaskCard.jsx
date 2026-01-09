import { memo } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { useTask } from '../../hooks/useTask'
import {
    XMarkIcon,
    PencilSquareIcon,
    CalendarIcon,
} from '@heroicons/react/24/outline'
import useAlert from '../../hooks/useAlert'
import { formatDate } from '../../utils/utils'

function TaskCard({ task, onEdit }) {
    const { removeFromTask } = useTask()
    const { setAlert } = useAlert()
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id,
    })

    const style = {
        transform: CSS.Translate.toString(transform),
    }

    const handleDelete = (e) => {
        e.stopPropagation()
        if (window.confirm(`ต้องการลบงาน "${task.title}" ใช่ไหม?`)) {
            removeFromTask(task.id)
            setAlert('ลบข้อมูลสำเร็จ!', 'error')
        }
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="relative group 
                bg-theme-light-card dark:bg-theme-dark-card 
                p-4 rounded-lg shadow-sm hover:shadow-md 
                cursor-grab active:cursor-grabbing touch-none
                border border-transparent hover:border-theme-light-accent/50"
        >
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        onEdit(task)
                    }}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="text-gray-400 hover:text-blue-400 cursor-pointer"
                >
                    <PencilSquareIcon className="w-5 h-5" />
                </button>

                <button
                    onClick={handleDelete}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="text-gray-400 hover:text-red-400 cursor-pointer"
                >
                    <XMarkIcon className="w-5 h-5" />
                </button>
            </div>

            {/* Title & Description */}
            <h3 className="font-bold text-lg mb-1 text-theme-light-text dark:text-gray-900 pr-14">
                {task.title}
            </h3>

            <p className="text-gray-600 dark:text-gray-800 text-sm mb-3 line-clamp-2">
                {task.description}
            </p>

            {/* Footer: Priority & Date */}
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200 dark:border-gray-600/20">
                {/* Priority Badge */}
                <span
                    className={`text-xs px-2 py-1 rounded-md font-medium uppercase tracking-wider
                    ${
                        task.priority === 'high'
                            ? 'bg-red-100 text-red-700'
                            : task.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                    }`}
                >
                    {task.priority}
                </span>

                {task.createdAt && (
                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-600 font-medium">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{formatDate(task.createdAt)}</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default memo(TaskCard)
