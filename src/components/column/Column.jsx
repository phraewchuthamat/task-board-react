import { memo, useMemo, useState } from 'react'
import { useDroppable } from '@dnd-kit/core'
import clsx from 'clsx'
import TaskList from '../TaskList/TaskList'
import ColumnHeader from './ColumnHeader'
import ColumnContainer from './ColumnContainer'
import ColumnForm from '../board/ColumnForm'
import { useTask } from '../../hooks/useTask'
import ConfirmDialog from '../dialog/ConfirmDialog'
import useAlert from '../../hooks/useAlert'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'

function Column({ title, tasks, status, color, onEdit }) {
    const { setNodeRef, isOver } = useDroppable({
        id: status,
    })

    const { updateColumn, deleteColumn } = useTask()
    const { setAlert } = useAlert()

    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const filteredTasks = useMemo(() => {
        if (!searchQuery.trim()) return tasks
        return tasks.filter((task) =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [tasks, searchQuery])

    const handleSaveEdit = (newTitle, newColor) => {
        updateColumn(status, newTitle, newColor)
        setIsEditing(false)
        setAlert(`Updated column "${newTitle}" successfully`, 'success')
    }

    const handleDeleteClick = () => {
        setIsConfirmOpen(true)
    }

    const handleConfirmDelete = () => {
        deleteColumn(status)
        setIsConfirmOpen(false)
        setAlert(`Column "${title}" deleted successfully`, 'info')
    }

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
                            onToggleSearch={() => {
                                setIsSearchOpen(true)
                            }}
                        />

                        {isSearchOpen && (
                            <div className="px-2 mb-2 mt-2">
                                <div className="relative">
                                    <MagnifyingGlassIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Filter tasks..."
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        className="w-full pl-8 pr-8 py-1.5 text-sm rounded-md bg-app-bg border border-app-border focus:outline-none focus:ring-1 focus:ring-app-primary"
                                        autoFocus
                                    />
                                    <button
                                        onClick={() => {
                                            setSearchQuery('')
                                            setIsSearchOpen(false)
                                        }}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                                    >
                                        <XMarkIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {!isEditing && (
                <div
                    className={clsx(
                        'flex-1 overflow-y-auto min-h-0 p-4 pt-0 flex flex-col gap-3 transition-colors',
                        'scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600',
                        isOver && 'bg-app-primary/5'
                    )}
                >
                    <TaskList tasks={tasks} onEdit={onEdit} />

                    {tasks.length > 0 && filteredTasks.length === 0 && (
                        <div className="text-center p-4 text-sm text-gray-500">
                            No tasks found.
                        </div>
                    )}

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

export default memo(Column)
