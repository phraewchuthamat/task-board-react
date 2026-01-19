import { useState } from 'react'
import { DragStartEvent, DragEndEvent, DragOverEvent } from '@dnd-kit/core'
import { Task, Column, TaskStatus } from '../utils/storage'

export function useBoardDrag(
    taskItems: Task[],
    columns: Column[],
    moveTask: (id: string, status: TaskStatus) => void,
    reorderTask: (activeId: string, overId: string) => void
) {
    const [activeTask, setActiveTask] = useState<Task | null>(null)

    const onDragStart = (event: DragStartEvent) => {
        const { active } = event
        const task = taskItems.find((t) => t.id === active.id)
        setActiveTask(task || null)
    }

    const onDragOver = (event: DragOverEvent) => {
        const { active, over } = event
        if (!over) return

        const activeId = String(active.id)
        const overId = String(over.id)

        // ถ้าลากวนอยู่ที่เดิม ไม่ต้องทำอะไร
        if (activeId === overId) return

        const activeTask = taskItems.find((t) => t.id === activeId)
        if (!activeTask) return

        // 1. เช็คว่าเราลากไปทับ "Task อื่น" หรือไม่
        const overTask = taskItems.find((t) => t.id === overId)

        if (overTask) {
            // ถ้าลากไปทับ Task ที่อยู่ "คนละ Column" (Status ต่างกัน)
            if (activeTask.status !== overTask.status) {
                // 🚀 สั่งย้าย Status ทันที! เพื่อให้ UI ขยับเปิดช่องว่างรับของใหม่
                // (Logic นี้จะทำให้ activeTask เปลี่ยน status ไปเป็น status ของ overTask ชั่วคราว)
                moveTask(activeId, overTask.status)
            }
            // ถ้า Status เดียวกัน dnd-kit จะจัดการเรื่อง Sort visual ให้เอง (หรือใช้ reorderTask ถ้าอยาก custom)
        }

        // 2. เช็คว่าเราลากไปทับ "Column ว่างๆ" หรือไม่
        const isOverColumn = columns.some((col) => col.status === overId)

        if (isOverColumn) {
            // ถ้าลากไปจ่อที่ Column ใหม่ และ Task ยังไม่ได้เปลี่ยน Status เป็นอันนั้น
            if (activeTask.status !== overId) {
                moveTask(activeId, overId as TaskStatus)
            }
        }
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

        if (isOverColumn) {
            const nextStatus = overId as TaskStatus
            if (activeTask.status !== nextStatus) {
                moveTask(activeId, nextStatus)
            }
            return
        }

        const overTask = taskItems.find((t) => t.id === overId)

        if (overTask) {
            if (activeTask.status === overTask.status) {
                reorderTask(activeId, overId)
            } else {
                moveTask(activeId, overTask.status)
            }
        }
    }

    const onDragCancel = () => {
        setActiveTask(null)
    }

    return {
        activeTask,
        onDragStart,
        onDragOver, // export ไปเผื่อใช้
        onDragEnd,
        onDragCancel,
    }
}
