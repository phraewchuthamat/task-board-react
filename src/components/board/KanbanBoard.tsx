import { useMemo, useState } from 'react'
import {
    DndContext,
    DragOverlay,
    closestCorners,
    useSensor,
    useSensors,
    PointerSensor,
    TouchSensor,
    KeyboardSensor,
    defaultDropAnimationSideEffects,
    DropAnimation,
    MeasuringStrategy,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useBoardDrag } from '../../hooks/useBoardDrag'
import { useTaskModal } from '../../hooks/task/useTaskModal'
import { useTasks } from '../../contexts/TaskContext'
import { useColumns } from '../../contexts/ColumnContext'
import { Priority } from '../../utils/storage'
import LoadingScreen from '../ui/LoadingScreen'
import BoardHeader from './BoardHeader'
import BoardColumns from './BoardColumns'
import TaskCard from '../TaskCard/TaskCard'
import TaskModal from '../TaskModal/TaskModal'

const dropAnimationConfig: DropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
        styles: {
            active: { opacity: '0.5' },
        },
    }),
}

export default function KanbanBoard() {
    const [searchQuery, setSearchQuery] = useState('')
    const [filterPriority, setFilterPriority] = useState<Priority | ''>('')

    const { taskItems, moveTask, reorderTask, isLoading } = useTasks()
    const { columns } = useColumns()

    const { activeTask, onDragStart, onDragEnd, onDragCancel } = useBoardDrag(
        taskItems,
        columns,
        moveTask,
        reorderTask
    )

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(TouchSensor, {
            activationConstraint: { delay: 150, tolerance: 5 },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const modal = useTaskModal()

    const filteredTasks = useMemo(() => {
        return taskItems.filter((task) => {
            const matchesSearch =
                !searchQuery.trim() ||
                task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                task.description
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase())
            const matchesPriority =
                !filterPriority || task.priority === filterPriority
            return matchesSearch && matchesPriority
        })
    }, [taskItems, searchQuery, filterPriority])

    if (isLoading) return <LoadingScreen text="Loading board..." />

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragCancel={onDragCancel}
            measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
        >
            <div className="flex flex-col h-full w-full">
                <div className="flex-none px-6 py-4 border-b border-app-border/50 bg-app-bg">
                    <BoardHeader
                        onNew={modal.openNewTask}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        filterPriority={filterPriority}
                        setFilterPriority={setFilterPriority}
                    />
                </div>

                <div className="flex-1 overflow-x-auto overflow-y-hidden px-6 pb-4 scrollbar-thin scroll-smooth snap-x snap-mandatory">
                    <div className="h-full inline-flex gap-6 items-start">
                        <BoardColumns
                            tasks={filteredTasks}
                            onEdit={modal.openEditTask}
                        />
                    </div>
                </div>

                <TaskModal
                    isOpen={modal.isOpen}
                    onClose={modal.closeModal}
                    taskToEdit={modal.taskToEdit}
                />

                <DragOverlay dropAnimation={dropAnimationConfig}>
                    {activeTask ? (
                        <TaskCard task={activeTask} isOverlay />
                    ) : null}
                </DragOverlay>
            </div>
        </DndContext>
    )
}
