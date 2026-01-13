import { memo } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import TaskCard from './TaskCard'
import clsx from 'clsx'

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
        <div className="flex flex-col w-90 shrink-0 rounded-3xl bg-slate-100 dark:bg-slate-900">
            {/* Header */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span
                            className={clsx(
                                'w-3 h-3 rounded-full',
                                statusColors[status]
                            )}
                        />
                        <h2 className="font-bold text-base">{title}</h2>
                    </div>

                    <span className="text-xs font-semibold opacity-60">
                        {tasks.length}
                    </span>
                </div>
            </div>

            {/* Task list */}
            <div
                ref={setNodeRef}
                className={clsx(
                    'flex-1 p-4 flex flex-col gap-3 select-none',
                    isOver && 'ring-2 ring-blue-400 ring-inset'
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
                    <div className="h-24 flex items-center justify-center text-xs opacity-40 border border-dashed rounded-xl">
                        Drop task here
                    </div>
                )}
            </div>
        </div>
    )
}

export default memo(Column)
