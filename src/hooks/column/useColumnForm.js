import { useState, useMemo } from 'react'

import useAlert from '../alert/useAlert'
import { useColumns } from './useColumns'

export const useColumnForm = (tasks, title, status) => {
    const { updateColumn, deleteColumn } = useColumns()
    const { setAlert } = useAlert()

    const [isEditing, setIsEditing] = useState(false)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
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
