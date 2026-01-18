import { useState, useMemo } from 'react'
import useAlert from '../alert/useAlert'
import { useColumns } from './useColumns'

// 1. รับ id เพิ่มเข้ามาใน arguments
export const useColumnForm = (tasks, id, title) => {
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

    // 2. ส่ง id ไป update แทน status
    const handleSaveEdit = (newTitle, newColor) => {
        updateColumn(id, { title: newTitle, color: newColor }) // ปรับรูปแบบ object ตาม ColumnContext
        setIsEditing(false)
        setAlert(`Updated column "${newTitle}" successfully`, 'success')
    }

    const handleDeleteClick = () => {
        setIsConfirmOpen(true)
    }

    // 3. ใช้ id ที่รับมาจาก hook โดยตรง (ไม่ต้องรับผ่าน parameter ซ้ำ)
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
