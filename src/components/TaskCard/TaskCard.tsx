import { memo } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import clsx from 'clsx'
import { Task } from '../../utils/storage'
import TaskCardMeta from './TaskCardMeta'
import TaskCardActions from './TaskCardActions'

interface TaskCardProps {
    task: Task
    onEdit?: (task: Task) => void
    onDelete?: (id: string) => void
    isOverlay?: boolean
}

function TaskCard({
    task,
    onEdit,
    onDelete,
    isOverlay = false,
}: TaskCardProps) {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: 'Task',
            task,
        },
        disabled: isEditMode,
    })

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
                'relative rounded p-4',
                'bg-app-card shadow border border-app-border',
                'cursor-grab active:cursor-grabbing',
                'touch-none',
                isOverlay && 'pointer-events-none opacity-90',
                isDragging && 'opacity-30'
            )}
        >
            <TaskCardActions task={task} onEdit={onEdit} onDelete={onDelete} />

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

const isEditMode = false

export default memo(TaskCard)
