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
        <ColumnContainer ref={setNodeRef}>
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
                        'flex-1 overflow-y-auto min-h-0 p-4 pt-0 flex flex-col gap-3 transition-colors',
                        'scrollbar-thin',
                        // ไฮไลท์เมื่อมีของมาลากผ่าน
                        isOver && 'bg-app-primary/5 rounded-b-xl'
                    )}
                >
                    <TaskList tasks={tasks} onEdit={onEdit} />

                    {/* Placeholder เมื่อไม่มี Task */}
                    {tasks.length === 0 && !isOver && (
                        <div className="h-24 flex items-center justify-center text-sm text-app-subtle opacity-60 border-2 border-dashed border-app-border rounded-xl">
                            Drop task here
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
