import { useState } from 'react'

export function useBoardDrag(taskItems, moveTask) {
    const [activeTask, setActiveTask] = useState(null)

    const onDragStart = ({ active }) => {
        const task = taskItems.find((t) => t.id === active.id)
        setActiveTask(task || null)
    }

    const onDragEnd = ({ active, over }) => {
        setActiveTask(null)
        if (!over) return

        const activeTask = taskItems.find((t) => t.id === active.id)
        if (!activeTask) return

        const overId = over.id

        const nextStatus = ['todo', 'doing', 'done'].includes(overId)
            ? overId
            : taskItems.find((t) => t.id === overId)?.status

        if (nextStatus && activeTask.status !== nextStatus) {
            moveTask(active.id, nextStatus)
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
