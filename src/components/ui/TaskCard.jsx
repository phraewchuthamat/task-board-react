import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { useTask } from '../../hooks/useTask'
import { XMarkIcon } from '@heroicons/react/24/outline'
import useAlert from '../../hooks/useAlert'

function TaskCard({ task }) {
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
            className="relative group bg-gray-700 p-3 rounded-md shadow-md hover:bg-gray-600 cursor-grab active:cursor-grabbing touch-none"
        >
            <button
                onClick={handleDelete}
                onPointerDown={(e) => e.stopPropagation()}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
                <XMarkIcon className="w-5 h-5" />
            </button>

            <h3 className="font-semibold text-white pr-6">{task.title}</h3>
            <p className="text-gray-400 text-sm mt-1 truncate">
                {task.description}
            </p>
            <div className="mt-2 flex justify-between items-center">
                <span
                    className={`text-xs px-2 py-1 rounded ${
                        task.priority === 'high'
                            ? 'bg-red-500/20 text-red-300'
                            : task.priority === 'medium'
                            ? 'bg-yellow-500/20 text-yellow-300'
                            : 'bg-green-500/20 text-green-300'
                    }`}
                >
                    {task.priority}
                </span>
            </div>
        </div>
    )
}

export default TaskCard
