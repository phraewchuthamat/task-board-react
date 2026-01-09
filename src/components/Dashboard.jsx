import { useState } from 'react'
import { useTask } from '../hooks/useTask'
import Column from './ui/Column'
import { DndContext, closestCorners } from '@dnd-kit/core'
import { PlusIcon } from '@heroicons/react/24/outline'
import TaskModal from './TaskModal'

export default function Dashboard() {
    const { taskItems, moveTask } = useTask()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [taskToEdit, setTaskToEdit] = useState(null)

    const todoTasks = taskItems.filter((task) => task.status === 'todo')
    const doingTasks = taskItems.filter((task) => task.status === 'doing')
    const doneTasks = taskItems.filter((task) => task.status === 'done')

    const handleEditTask = (task) => {
        setTaskToEdit(task)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setTaskToEdit(null)
    }

    const handleDragEnd = (event) => {
        const { active, over } = event

        if (!over) return

        const taskId = active.id
        const newStatus = over.id

        if (taskId !== newStatus) {
            moveTask(taskId, newStatus)
        }
    }

    return (
        <DndContext
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
        >
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Kanban Board</h1>
                <button
                    onClick={() => {
                        setTaskToEdit(null)
                        setIsModalOpen(true)
                    }} // กดแล้ว state เป็น true
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
                >
                    <PlusIcon className="h-5 w-5" />
                    New Task
                </button>
            </div>
            <div className="flex flex-row gap-4 p-4 h-full overflow-x-auto items-start justify-center min-h-screen bg-gray-900 text-white">
                <Column
                    title="To Do"
                    tasks={todoTasks}
                    status="todo"
                    onEdit={handleEditTask}
                />
                <Column
                    title="Doing"
                    tasks={doingTasks}
                    status="doing"
                    onEdit={handleEditTask}
                />
                <Column
                    title="Done"
                    tasks={doneTasks}
                    status="done"
                    onEdit={handleEditTask}
                />
            </div>

            <TaskModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                taskToEdit={taskToEdit}
            />
        </DndContext>
    )
}
