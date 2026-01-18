import { useState } from 'react'
import useAlert from '../alert/useAlert'
import { useColumns } from './useColumns'

export const useColumnForm = (id, title) => {
    const { updateColumn, deleteColumn } = useColumns()
    const { setAlert } = useAlert()

    const [isEditing, setIsEditing] = useState(false)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)

    const handleSaveEdit = (newTitle, newColor) => {
        updateColumn(id, { title: newTitle, color: newColor }) // ปรับรูปแบบ object ตาม ColumnContext
        setIsEditing(false)
        setAlert(`Updated column "${newTitle}" successfully`, 'success')
    }

    const handleDeleteClick = () => {
        setIsConfirmOpen(true)
    }

    const handleConfirmDelete = () => {
        deleteColumn(id)
        setIsConfirmOpen(false)
        setAlert(`Column "${title}" deleted successfully`, 'success')
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
