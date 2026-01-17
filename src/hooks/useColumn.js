import { useState, useMemo } from 'react'
import { useTask } from './useTask'
import useAlert from './useAlert'

export const useColumn = (tasks, title, status) => {
    const { updateColumn, deleteColumn } = useTask()
    const { setAlert } = useAlert()

    const [isEditing, setIsEditing] = useState(false)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    // --- Logic: Filter Tasks ---
    const filteredTasks = useMemo(() => {
        if (!searchQuery.trim()) return tasks
        return tasks.filter((task) =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [tasks, searchQuery])

    // --- Handlers ---
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
        setAlert(`Column "${title}" deleted successfully`, 'success')
    }

    return {
        isEditing,
        setIsEditing,
        isConfirmOpen,
        setIsConfirmOpen,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        filteredTasks,
        handleSaveEdit,
        handleDeleteClick,
        handleConfirmDelete,
    }
}
