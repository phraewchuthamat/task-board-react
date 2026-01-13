import { memo } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import clsx from 'clsx'
import TaskCard from '../ui/TaskCard/TaskCard'

function Column({ title, tasks, status, onEdit }) {
    const { setNodeRef, isOver } = useDroppable({
        id: status,
    })

    const statusColors = {
        todo: 'bg-blue-500',
        doing: 'bg-yellow-500',
        done: 'bg-emerald-500',
    }

    return (
        <div className="flex flex-col w-90 shrink-0 rounded-xl bg-app-surface border border-app-border shadow-md">
            {/* Header */}
            <div className="p-4 border-b border-app-border">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span
                            className={clsx(
                                'w-3 h-3 rounded-full',
                                statusColors[status]
                            )}
                        />
                        <h2 className="font-semibold text-app-text">{title}</h2>
                    </div>

                    <span
                        className="flex items-center justify-center
                            min-w-[24px] h-6 px-1.5
                            bg-gray-200 dark:bg-gray-700
                            rounded-full 
                            text-xs font-bold
                            text-app-subtle /* ใช้สีตัวอักษรที่จางลง */"
                    >
                        {tasks.length}
                    </span>
                </div>
            </div>

            {/* Task list */}
            <div
                ref={setNodeRef}
                className={clsx(
                    'flex-1 p-4 flex flex-col gap-3 select-none transition-shadow',
                    isOver && 'ring-2 ring-blue-400 ring-inset rounded-b-xl'
                )}
            >
                <SortableContext
                    items={tasks.map((t) => t.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {tasks.map((task) => (
                        <TaskCard key={task.id} task={task} onEdit={onEdit} />
                    ))}
                </SortableContext>

                {tasks.length === 0 && !isOver && (
                    <div className="h-24 flex items-center justify-center text-sm text-app-subtle opacity-60 border-2 border-dashed border-app-border rounded-xl">
                        Drop task here
                    </div>
                )}
            </div>
        </div>
    )
}

export default memo(Column)
