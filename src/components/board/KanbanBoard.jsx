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
    const { taskItems, moveTask, isLoading } = useTasks()
    const { columns } = useColumns()

    const { activeTask, onDragStart, onDragEnd, onDragCancel } = useBoardDrag(
        taskItems,
        columns,
        moveTask
    )

    const modal = useTaskModal()

    const filteredTasks = useMemo(() => {
        if (!searchQuery.trim()) return taskItems

        const lowerQuery = searchQuery.toLowerCase()
        return taskItems.filter(
            (task) =>
                task.title.toLowerCase().includes(lowerQuery) ||
                task.description?.toLowerCase().includes(lowerQuery)
        )
    }, [taskItems, searchQuery])

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
