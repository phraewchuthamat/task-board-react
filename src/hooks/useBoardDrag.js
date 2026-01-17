import { useState } from 'react'

export function useBoardDrag(taskItems, columns, moveTask) {
    const [activeTask, setActiveTask] = useState(null)

    const onDragStart = ({ active }) => {
        const task = taskItems.find((t) => t.id === active.id)
        setActiveTask(task || null)
    }

    const onDragEnd = ({ active, over }) => {
        setActiveTask(null)
        if (!over) return

        const activeId = active.id
        const overId = over.id

        if (activeId === overId) return

        const activeTask = taskItems.find((t) => t.id === activeId)
        if (!activeTask) return

        const isOverColumn = columns.some((col) => col.status === overId)

        let nextStatus = ''

        if (isOverColumn) {
            nextStatus = overId
        } else {
            const overTask = taskItems.find((t) => t.id === overId)
            nextStatus = overTask?.status
        }

        if (nextStatus && activeTask.status !== nextStatus) {
            moveTask(activeId, nextStatus)
        }
    }

    const onDragCancel = () => {
        setActiveTask(null)
    }

    return {
        activeTask,
        onDragStart,
        onDragEnd,
        onDragCancel,
    }
}
