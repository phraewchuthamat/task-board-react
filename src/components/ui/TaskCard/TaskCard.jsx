import { memo } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import clsx from 'clsx'

import TaskCardActions from './TaskCardActions'
import TaskCardMeta from './TaskCardMeta'

function TaskCard({ task, onEdit, isOverlay = false }) {
    const { setNodeRef, attributes, listeners, transform, transition } =
        useSortable({ id: task.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={clsx(
                'relative rounded-lg p-4 cursor-grab active:cursor-grabbing',
                'bg-app-card shadow-md border border-app-border',
                'transition-shadow hover:shadow-lg',
                isOverlay && 'pointer-events-none opacity-90'
            )}
        >
            <TaskCardActions task={task} onEdit={onEdit} />

            <h3 className="font-semibold text-sm mb-1 pr-12 text-app-text">
                {task.title}
            </h3>

            <p className="text-xs text-app-subtle mb-3 line-clamp-2">
                {task.description}
            </p>

            <TaskCardMeta task={task} />
        </div>
    )
}

export default memo(TaskCard)
