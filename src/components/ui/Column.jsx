import TaskCard from './TaskCard'
import { useDroppable } from '@dnd-kit/core'

function Column({ title, tasks, status, onEdit }) {
    const { setNodeRef, isOver } = useDroppable({
        id: status,
    })

    const statusColor =
        status === 'todo'
            ? 'bg-blue-500'
            : status === 'doing'
            ? 'bg-yellow-500'
            : 'bg-green-500'

    return (
        <div
            ref={setNodeRef}
            className={`
                flex flex-col 
                min-w-95 max-w-100 h-full max-h-[85vh]
                rounded-xl shadow-lg border-2              
                bg-theme-light-surface dark:bg-theme-dark-surface
                ${
                    isOver
                        ? 'border-blue-500 bg-blue-50 dark:bg-gray-700/50 shadow-blue-500/20'
                        : 'border-transparent dark:border-gray-700/50'
                }
            `}
        >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center sticky top-0 bg-inherit rounded-t-xl z-10 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <div
                        className={`w-3 h-3 rounded-full ${statusColor} shadow-sm`}
                    />
                    <h2 className="text-lg font-bold text-theme-light-text dark:text-theme-dark-text uppercase tracking-wide">
                        {title}
                    </h2>
                </div>

                <span
                    className="
                    bg-white dark:bg-gray-700 
                    text-gray-600 dark:text-gray-300 
                    text-xs font-bold px-2.5 py-1 rounded-full shadow-sm border border-gray-100 dark:border-gray-600
                "
                >
                    {tasks.length}
                </span>
            </div>

            <div className="flex-1 p-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent flex flex-col gap-3">
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <TaskCard key={task.id} task={task} onEdit={onEdit} />
                    ))
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 border-2 border-dashed border-gray-200 dark:border-gray-700/50 rounded-lg p-4 m-2 animate-pulse">
                        <p className="text-sm font-medium">Drop items here</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Column
