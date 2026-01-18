import { useMemo, useState } from 'react'
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core'
import { useBoardDrag } from '../../hooks/useBoardDrag'
import { useTaskModal } from '../../hooks/task/useTaskModal'
import { useTasks } from '../../hooks/task/useTasks'
import { useColumns } from '../../hooks/column/useColumns'
import LoadingScreen from '../ui/LoadingScreen'
import BoardHeader from './BoardHeader'
import BoardColumns from './BoardColumns'
import TaskCard from '../TaskCard/TaskCard'
import TaskModal from '../TaskModal/TaskModal'

export default function KanbanBoard() {
    const [searchQuery, setSearchQuery] = useState('')
    const [filterPriority, setFilterPriority] = useState('')
    const { taskItems, moveTask, isLoading } = useTasks()
    const { columns } = useColumns()

    const { activeTask, onDragStart, onDragEnd, onDragCancel } = useBoardDrag(
        taskItems,
        columns,
        moveTask
    )

    const modal = useTaskModal()

    const filteredTasks = useMemo(() => {
        return taskItems.filter((task) => {
            // Check 1: Search Text
            const matchesSearch =
                !searchQuery.trim() ||
                task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                task.description
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase())

            // Check 2: Priority Filter (เพิ่มส่วนนี้)
            const matchesPriority =
                !filterPriority || task.priority === filterPriority

            // ต้องผ่านทั้งคู่ (AND Condition)
            return matchesSearch && matchesPriority
        })
    }, [taskItems, searchQuery, filterPriority])

    if (isLoading) return <LoadingScreen text="Loading board..." />

    return (
        <DndContext
            collisionDetection={closestCorners}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragCancel={onDragCancel}
        >
            <BoardHeader
                onNew={modal.openNewTask}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                filterPriority={filterPriority}
                setFilterPriority={setFilterPriority}
            />

            <BoardColumns tasks={filteredTasks} onEdit={modal.openEditTask} />

            <TaskModal
                isOpen={modal.isOpen}
                onClose={modal.closeModal}
                taskToEdit={modal.taskToEdit}
            />

            <DragOverlay>
                {activeTask && <TaskCard task={activeTask} isOverlay />}
            </DragOverlay>
        </DndContext>
    )
}
