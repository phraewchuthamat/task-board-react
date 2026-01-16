import { memo } from 'react'
import { useDroppable } from '@dnd-kit/core'
import clsx from 'clsx'
import TaskList from '../TaskList/TaskList'
import ColumnHeader from './ColumnHeader'

function Column({ title, tasks, status, onEdit }) {
    const { setNodeRef, isOver } = useDroppable({
        id: status,
    })

    return (
        <div className="flex flex-col w-90 shrink-0 rounded-xl bg-app-surface border border-app-border shadow-md">
            <ColumnHeader title={title} status={status} count={tasks.length} />

            <div
                ref={setNodeRef}
                className={clsx(
                    'flex-1 p-4 flex flex-col gap-3 select-none transition-shadow',
                    isOver && 'ring-2 ring-blue-400 ring-inset rounded-b-xl'
                )}
            >
                <TaskList tasks={tasks} onEdit={onEdit} />

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
