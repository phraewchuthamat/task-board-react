import { useState } from 'react'

import { useColumns } from '../../contexts/ColumnContext'
import { useAlert } from '../../contexts/AlertContext'

export function useColumnForm(columnId: string) {
    const { updateColumn, deleteColumn } = useColumns()
    const { setAlert } = useAlert()

    const [isEditing, setIsEditing] = useState(false)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)

    const handleSaveEdit = (newTitle: string, newColor: string) => {
        updateColumn(columnId, { title: newTitle, color: newColor })
        setIsEditing(false)
        setAlert(`Column "${newTitle}" updated!`, 'success')
    }

    const handleDeleteClick = () => {
        setIsConfirmOpen(true)
    }

    const handleConfirmDelete = () => {
        deleteColumn(columnId)
        setIsConfirmOpen(false)
        setAlert('Deleted column successfully!', 'success')
    }

    return {
        isEditing,
        setIsEditing,
        isConfirmOpen,
        setIsConfirmOpen,
        handleSaveEdit,
        handleDeleteClick,
        handleConfirmDelete,
    }
}
