import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core'
import { useTask } from '../../hooks/useTask'
import { useBoardDrag } from '../../hooks/useBoardDrag'
import { useTaskModal } from '../../hooks/useTaskModal'

import LoadingScreen from '../ui/LoadingScreen'
import BoardHeader from './BoardHeader'
import BoardColumns from './BoardColumns'
import TaskCard from '../TaskCard/TaskCard'
import TaskModal from '../TaskModal/TaskModal'

export default function Board() {
    const { taskItems, moveTask, isLoading } = useTask()

    const { activeTask, onDragStart, onDragEnd, onDragCancel } = useBoardDrag(
        taskItems,
        moveTask
    )

    const modal = useTaskModal()

    if (isLoading) return <LoadingScreen text="Loading board..." />

    return (
        <DndContext
            collisionDetection={closestCorners}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragCancel={onDragCancel}
        >
            <BoardHeader onNew={modal.openNewTask} />

            <BoardColumns tasks={taskItems} onEdit={modal.openEditTask} />

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
