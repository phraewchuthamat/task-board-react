import { useState } from 'react'
import { useTask } from '../hooks/useTask'
import Column from './ui/Column'
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core'
import { PlusIcon } from '@heroicons/react/24/outline'
import TaskModal from './TaskModal'
import TaskCard from './ui/TaskCard'

export default function Board() {
    const { taskItems, moveTask } = useTask()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [taskToEdit, setTaskToEdit] = useState(null)

    const [activeTask, setActiveTask] = useState(null)

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

    const handleDragStart = (event) => {
        const task = taskItems.find((t) => t.id === event.active.id)
        setActiveTask(task)
    }

    const handleDragEnd = (event) => {
        setActiveTask(null)
        const { active, over } = event
        if (!over) return

        const activeTaskId = active.id
        const overId = over.id

        // หา task ที่ถูกลาก
        const activeTask = taskItems.find((t) => t.id === activeTaskId)
        if (!activeTask) return

        // ถ้าวางบน column ตรง ๆ (id = todo / doing / done)
        if (['todo', 'doing', 'done'].includes(overId)) {
            if (activeTask.status !== overId) {
                moveTask(activeTaskId, overId)
            }
            return
        }

        // ถ้าวางบน task อื่น → ใช้ status ของ task นั้น
        const overTask = taskItems.find((t) => t.id === overId)
        if (!overTask) return

        if (activeTask.status !== overTask.status) {
            moveTask(activeTaskId, overTask.status)
        }
    }

    const handleDragCancel = () => {
        setActiveTask(null)
    }

    const today = new Date().toLocaleDateString('th-TH', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    })

    return (
        <DndContext
            collisionDetection={closestCorners}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
        >
            <div className="pt-8 px-8 pb-4">
                <h1 className="text-3xl font-bold text-theme-light-text bg-theme-light-bg dark:bg-theme-dark-bg flex items-baseline gap-3">
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
                    fixed top-30 right-10 z-50 
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

            <DragOverlay>
                {activeTask ? <TaskCard task={activeTask} isOverlay /> : null}
            </DragOverlay>
        </DndContext>
    )
}
