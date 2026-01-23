import { useMemo, useState } from 'react'
import { useTasks } from '../contexts/TaskContext'
import { Priority } from '../utils/storage'

export function useKanban() {
    const [searchQuery, setSearchQuery] = useState('')
    const [filterPriority, setFilterPriority] = useState<Priority | ''>('')
    const { taskItems, moveTask, reorderTask, isLoading } = useTasks()

    const filteredTasks = useMemo(() => {
        return taskItems.filter((task) => {
            const matchesSearch =
                !searchQuery.trim() ||
                task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                task.description
                    ?.toLowerCase()
                    .includes(searchQuery.toLowerCase())
            const matchesPriority =
                !filterPriority || task.priority === filterPriority
            return matchesSearch && matchesPriority
        })
    }, [taskItems, searchQuery, filterPriority])

    return {
        searchQuery,
        setSearchQuery,
        filterPriority,
        setFilterPriority,
        filteredTasks,
        isLoading,
        moveTask,
        reorderTask,
        taskItems,
    }
}
