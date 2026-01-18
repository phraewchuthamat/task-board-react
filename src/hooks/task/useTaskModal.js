import { useState, useCallback } from 'react'

export function useTaskModal() {
    const [isOpen, setIsOpen] = useState(false)
    const [taskToEdit, setTaskToEdit] = useState(null)

    const openNewTask = useCallback(() => {
        setTaskToEdit(null)
        setIsOpen(true)
    }, [])

    const openEditTask = useCallback((task) => {
        setTaskToEdit(task)
        setIsOpen(true)
    }, [])

    const closeModal = useCallback(() => {
        setIsOpen(false)
        setTaskToEdit(null)
    }, [])

    return {
        isOpen,
        taskToEdit,
        openNewTask,
        openEditTask,
        closeModal,
    }
}
