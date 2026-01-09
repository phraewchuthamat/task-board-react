import { createContext, useEffect, useReducer } from 'react'
import { taskReducer, TASK_ACTIONS } from '../reducer/taskReducer'
import { taskDefault } from '../utils/storage'

const TaskContext = createContext()

const getInitialState = () => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : taskDefault
}

export default function TaskProvider({ children }) {
    const [taskItems, dispatch] = useReducer(taskReducer, [], getInitialState)

    const createTask = (taskData) => {
        const newTask = {
            id: Date.now(),
            ...taskData,
            status: 'todo',
            createdAt: new Date().toISOString(),
        }
        dispatch({ type: TASK_ACTIONS.ADD_TASK, payload: newTask })
    }

    const updateTask = (id, updates) => {
        dispatch({
            type: TASK_ACTIONS.UPDATE_TASK,
            payload: { id, ...updates },
        })
    }

    const moveTask = (id, status) => {
        // Reuse Logic ของ UPDATE_TASK
        dispatch({ type: TASK_ACTIONS.UPDATE_TASK, payload: { id, status } })
    }

    const removeFromTask = (id) => {
        dispatch({ type: TASK_ACTIONS.DELETE_TASK, payload: id })
    }

    const clearTask = () => {
        dispatch({ type: TASK_ACTIONS.CLEAR_TASKS })
    }

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
                moveTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    )
}

export { TaskContext }
