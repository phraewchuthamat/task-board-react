import { memo } from 'react'
import { useDroppable } from '@dnd-kit/core'
import clsx from 'clsx'
import TaskList from '../TaskList/TaskList'
import ColumnHeader from './ColumnHeader'
import ColumnContainer from './ColumnContainer'
import ColumnForm from './ColumnForm'
import ConfirmDialog from '../dialog/ConfirmDialog'
import { useColumnForm } from '../../hooks/column/useColumnForm'
import { Task } from '../../utils/storage'

interface TaskColumnProps {
    id: string
    title: string
    status: string
    color: string
    tasks: Task[]
    onEdit?: (task: Task) => void
}

function TaskColumn({
    id,
    title,
    tasks,
    status,
    color,
    onEdit,
}: TaskColumnProps) {
    const { setNodeRef, isOver } = useDroppable({
        id: status,
    })

    const {
        isEditing,
        setIsEditing,
        isConfirmOpen,
        setIsConfirmOpen,
        handleSaveEdit,
        handleDeleteClick,
        handleConfirmDelete,
    } = useColumnForm(id)

    return (
        <ColumnContainer ref={setNodeRef} className="h-full max-h-full">
            <div className="flex-none p-2">
                {isEditing ? (
                    <ColumnForm
                        initialData={{ title, color }}
                        onSave={handleSaveEdit}
                        onCancel={() => setIsEditing(false)}
                    />
                ) : (
                    <ColumnHeader
                        title={title}
                        status={status}
                        count={tasks.length}
                        color={color}
                        onEditClick={() => setIsEditing(true)}
                        onDeleteClick={handleDeleteClick}
                    />
                )}
            </div>

            {/* ส่วนแสดงรายการ Task */}
            {!isEditing && (
                <div
                    className={clsx(
                        'flex-1 overflow-y-scroll min-h-0',
                        'scrollbar-thin',
                        'p-4 pt-0 flex flex-col gap-3 transition-colors duration-200',
                        'scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600',
                        isOver ? 'bg-app-primary/10' : 'bg-transparent'
                    )}
                >
                    <TaskList tasks={tasks} onEdit={onEdit} />

                    {tasks.length === 0 && (
                        <div
                            className={clsx(
                                'h-24 flex items-center justify-center text-sm rounded-xl transition-all border-2 border-dashed mt-4',
                                isOver
                                    ? 'border-app-primary text-app-primary bg-app-surface' // ตอนลากมาวาง
                                    : 'border-app-border text-app-subtle opacity-60' // ตอนปกติ
                            )}
                        >
                            {isOver ? 'Drop here!' : 'Drop task here'}
                        </div>
                    )}
                </div>
            )}

            <ConfirmDialog
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Column"
                message={`Are you sure you want to delete column "${title}"? All tasks inside will be deleted too.`}
            />
        </ColumnContainer>
    )
}

export default memo(TaskColumn)
