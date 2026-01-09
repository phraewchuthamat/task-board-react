import TaskCard from './TaskCard'
import { useDraggable } from '@dnd-kit/core'

function Column({ title, tasks, status }) {
    const { setNodeRef } = useDraggable({
        id: status,
    })

    return (
        <div
            ref={setNodeRef}
            className="bg-gray-800 p-4 rounded-lg w-80 min-h-125 flex flex-col gap-4"
        >
            <h2 className="text-xl font-bold mb-2 flex justify-between items-center">
                {title}
                <span className="bg-gray-700 text-sm px-2 py-1 rounded-full">
                    {tasks.length}
                </span>
            </h2>

            <div className="flex flex-col gap-3">
                {tasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
        </div>
    )
}

export default Column
