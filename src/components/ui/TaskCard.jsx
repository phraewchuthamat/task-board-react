import React from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

function TaskCard({ task }) {
    // ดึง isDragging มาเช็คด้วย
    const { attributes, listeners, setNodeRef, transform, isDragging } =
        useDraggable({
            id: task.id,
        })

    const style = {
        transform: CSS.Translate.toString(transform),
        // ถ้ากำลังลาก (isDragging = true) ให้ตัวเดิมจางลง
        opacity: isDragging ? 0.5 : 1,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            className="bg-gray-700 p-3 rounded-md shadow-md hover:bg-gray-600 cursor-grab active:cursor-grabbing touch-none"
        >
            <h3 className="font-semibold text-white">{task.title}</h3>
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
