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

// 1. รับ id เข้ามาใน props
function TaskColumn({ id, title, tasks, status, color, onEdit }) {
    // dnd-kit ยังคงใช้ status เป็น id ได้ ถ้า logic การ drag ยังอิง status
    // หรือจะเปลี่ยนเป็น id ก็ได้ แต่ต้องแก้ฝั่ง DragDropContext ด้วย
    const { setNodeRef, isOver } = useDroppable({
        id: status,
    })

    // 2. ส่ง id ไปให้ hook
    const {
        isEditing,
        setIsEditing,
        isConfirmOpen,
        setIsConfirmOpen,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        filteredTasks, // เราจะใช้ตัวนี้แทน tasks เดิม
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
                        'scrollbar-thin',
                        isOver && 'bg-app-primary/5'
                    )}
                >
                    {/* 3. แก้ไขตรงนี้: ใช้ filteredTasks แทน tasks */}
                    <TaskList tasks={filteredTasks} onEdit={onEdit} />

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
                onConfirm={handleConfirmDelete} // ไม่ต้องส่ง id แล้ว เพราะ hook รู้จัก id
                title="Confirm deletion"
                message={`Are you sure you want to delete column "${title}" and all its tasks?`}
            />
        </ColumnContainer>
    )
}

export default memo(TaskColumn)
