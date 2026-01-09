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

    const today = new Date().toLocaleDateString('th-TH', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    })

    return (
        <DndContext
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
        >
            <div className="pt-8 px-8 pb-4">
                <h1 className="text-3xl font-bold text-theme-light-text dark:text-theme-dark-text flex items-baseline gap-3">
                    Todo Today
                    <span className="text-lg font-medium text-gray-500 dark:text-gray-400">
                        {today}
                    </span>
                </h1>
            </div>

            <div className="flex flex-row gap-6 p-6 h-full overflow-x-auto items-start justify-center min-h-[80vh]">
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

            <button
                onClick={() => {
                    setTaskToEdit(null)
                    setIsModalOpen(true)
                }}
                className="
                    fixed top-20 right-10 z-50 
                    flex items-center gap-2 px-6 py-3 
                    bg-linear-to-r from-blue-500 to-indigo-600 
                    hover:from-blue-600 hover:to-indigo-700
                    text-white font-bold text-lg rounded-full 
                    shadow-lg hover:shadow-2xl hover:scale-105 
                    transform transition-all duration-300 ease-out
                    group
                "
            >
                <PlusIcon className="h-6 w-6 group-hover:rotate-90 transition-transform duration-300" />
                <span>New Task</span>
            </button>

            <TaskModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                taskToEdit={taskToEdit}
            />
        </DndContext>
    )
}
