import { useMemo, useState } from 'react'
import {
    DndContext,
    DragOverlay,
    closestCorners,
    useSensor,
    useSensors,
    PointerSensor,
    KeyboardSensor,
    TouchSensor,
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

export default function KanbanBoard() {
    const [searchQuery, setSearchQuery] = useState('')
    const [filterPriority, setFilterPriority] = useState<Priority | ''>('')

    const { taskItems, moveTask, isLoading } = useTasks()
    const { columns } = useColumns()

    const { activeTask, onDragStart, onDragEnd, onDragCancel } = useBoardDrag(
        taskItems,
        columns,
        moveTask
    )

    //  Sensors Config
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // ต้องลากเมาส์เกิน 5px ถึงจะนับว่าลาก (ช่วยให้คลิกปุ่มง่ายขึ้น)
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 250, // สำหรับมือถือ: กดค้าง 250ms ถึงจะลาก (ป้องกันเวลาเลื่อนจอ)
                tolerance: 5,
            },
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
            measuring={{
                droppable: {
                    strategy: MeasuringStrategy.Always,
                },
            }}
        >
            <div className="flex flex-col h-full w-full">
                <BoardHeader
                    onNew={modal.openNewTask}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    filterPriority={filterPriority}
                    setFilterPriority={setFilterPriority}
                />

                <BoardColumns
                    tasks={filteredTasks}
                    onEdit={modal.openEditTask}
                />

                <TaskModal
                    isOpen={modal.isOpen}
                    onClose={modal.closeModal}
                    taskToEdit={modal.taskToEdit}
                />

                <DragOverlay>
                    {activeTask ? (
                        <TaskCard task={activeTask} isOverlay />
                    ) : null}
                </DragOverlay>
            </div>
        </DndContext>
    )
}
