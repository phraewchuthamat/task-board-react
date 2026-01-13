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

    // ... (Handlers อื่นๆ เหมือนเดิม) ...
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

        const activeTask = taskItems.find((t) => t.id === activeTaskId)
        if (!activeTask) return

        if (['todo', 'doing', 'done'].includes(overId)) {
            if (activeTask.status !== overId) {
                moveTask(activeTaskId, overId)
            }
            return
        }

        const overTask = taskItems.find((t) => t.id === overId)
        if (!overTask) return

        if (activeTask.status !== overTask.status) {
            moveTask(activeTaskId, overTask.status)
        }
    }

    const handleDragCancel = () => {
        setActiveTask(null)
    }
    // ...

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
            <div className="container mx-auto px-6 pt-8 pb-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-app-text flex items-baseline gap-3">
                        Todo Today
                        <span className="text-lg font-medium text-app-subtle">
                            {today}
                        </span>
                    </h1>

                    <button
                        onClick={() => {
                            setTaskToEdit(null)
                            setIsModalOpen(true)
                        }}
                        className="
                            flex items-center gap-2 px-4 py-2 
                            bg-app-accent hover:bg-cyan-600 /* ใช้ hover ที่เข้ากับสีใหม่ */
                            text-white font-semibold text-sm rounded-lg 
                            shadow-md hover:shadow-lg
                            transform transition-all duration-300 ease-out
                        "
                    >
                        <PlusIcon className="h-5 w-5" />
                        <span>New Task</span>
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-6 pb-6 mt-4">
                <div className="flex flex-row gap-6 items-start justify-center">
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
            </div>

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
