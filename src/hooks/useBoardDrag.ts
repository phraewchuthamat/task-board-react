import { useState } from 'react'
import { DragStartEvent, DragEndEvent } from '@dnd-kit/core'
import { Task, Column, TaskStatus } from '../utils/storage'

export function useBoardDrag(
    taskItems: Task[],
    columns: Column[],
    moveTask: (id: string, status: TaskStatus) => void
) {
    const [activeTask, setActiveTask] = useState<Task | null>(null)

    const onDragStart = (event: DragStartEvent) => {
        const { active } = event
        const task = taskItems.find((t) => t.id === active.id)
        setActiveTask(task || null)
    }

    const onDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        setActiveTask(null)

        if (!over) return

        const activeId = String(active.id)
        const overId = String(over.id)

        if (activeId === overId) return

        const activeTask = taskItems.find((t) => t.id === activeId)
        if (!activeTask) return

        const isOverColumn = columns.some((col) => col.status === overId)

        let nextStatus = ''

        if (isOverColumn) {
            nextStatus = overId
        } else {
            const overTask = taskItems.find((t) => t.id === overId)
            if (overTask) {
                nextStatus = overTask.status
            }
        }

        if (nextStatus && activeTask.status !== nextStatus) {
            moveTask(activeId, nextStatus as TaskStatus)
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
