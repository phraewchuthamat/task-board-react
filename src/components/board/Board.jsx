import { useState, useCallback } from 'react'
import { DndContext, DragOverlay, closestCorners } from '@dnd-kit/core'
import { useTask } from '../../hooks/useTask'
import { useBoardDrag } from '../../hooks/useBoardDrag'

import BoardHeader from './BoardHeader'
import BoardColumns from './BoardColumns'
import TaskCard from '../TaskCard/TaskCard'
import TaskModal from '../TaskModal/TaskModal'

export default function Board() {
    const { taskItems, moveTask } = useTask()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [taskToEdit, setTaskToEdit] = useState(null)

    const { activeTask, onDragStart, onDragEnd, onDragCancel } = useBoardDrag(
        taskItems,
        moveTask
    )

    const handleEditTask = useCallback((task) => {
        setTaskToEdit(task)
        setIsModalOpen(true)
    }, [])

    const handleNewTask = useCallback(() => {
        setTaskToEdit(null)
        setIsModalOpen(true)
    }, [])

    return (
        <DndContext
            collisionDetection={closestCorners}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragCancel={onDragCancel}
        >
            <BoardHeader onNew={handleNewTask} />

            <BoardColumns tasks={taskItems} onEdit={handleEditTask} />

            <TaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                taskToEdit={taskToEdit}
            />

            <DragOverlay>
                {activeTask && <TaskCard task={activeTask} isOverlay />}
            </DragOverlay>
        </DndContext>
    )
}
