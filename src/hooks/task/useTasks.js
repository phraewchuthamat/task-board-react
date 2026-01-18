import { useContext } from 'react'
import { TaskContext } from '../../contexts/TaskContext'

export const useTasks = () => {
    const context = useContext(TaskContext)

    if (!context) {
        throw new Error('useTask must be used within a taskContext')
    }

    return context
}
