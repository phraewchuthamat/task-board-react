import { memo } from 'react'
import { useDroppable } from '@dnd-kit/core'
import clsx from 'clsx'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import TaskList from '../TaskList/TaskList'
import ColumnHeader from './ColumnHeader'
import ColumnContainer from './ColumnContainer'
import ColumnForm from './ColumnForm'
import ConfirmDialog from '../dialog/ConfirmDialog'
import { useColumnForm } from '../../hooks/column/useColumnForm'

function TaskColumn({ id, title, tasks, status, color, onEdit }) {
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
    } = useColumnForm(tasks, id, title)

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
                    <>
                        <ColumnHeader
                            title={title}
                            status={status}
                            count={tasks.length}
                            color={color}
                            onEditClick={() => setIsEditing(true)}
                            onDeleteClick={handleDeleteClick}
                        />
                    </>
                )}
            </div>

            {!isEditing && (
                <div
                    className={clsx(
                        'flex-1 overflow-y-auto min-h-0 p-4 pt-0 flex flex-col gap-3 transition-colors',
                        'scrollbar-thin',
                        isOver && 'bg-app-primary/5'
                    )}
                >
                    <TaskList tasks={tasks} onEdit={onEdit} />

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
                title="Confirm deletion"
                message={`Are you sure you want to delete column "${title}" and all its tasks?`}
            />
        </ColumnContainer>
    )
}

export default memo(TaskColumn)
