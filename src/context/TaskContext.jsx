import { createContext, useEffect, useReducer, useState } from 'react'
import { taskReducer, TASK_ACTIONS } from '../reducer/taskReducer'

const TaskContext = createContext()

export default function TaskProvider({ children }) {
    const [taskItems, dispatch] = useReducer(taskReducer, [])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    const createTask = (task) => {
        dispatch({ type: TASK_ACTIONS.CREATE_TODO, payload: task })
    }

    const updateTask = (id) => {
        dispatch({ type: TASK_ACTIONS.UPDATE_TODO, payload: { id } })
    }

    const removeFromTask = (id) => {
        dispatch({ type: TASK_ACTIONS.DELETE_TODO, payload: id })
    }

    const clearTask = () => dispatch({ type: TASK_ACTIONS.CLEAR_TODO })

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(taskItems))
    }, [taskItems])

    return (
        <TaskContext.Provider
            value={{
                taskItems,
                createTask,
                updateTask,
                removeFromTask,
                clearTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}

export { TaskContext }
