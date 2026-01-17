import {
    createContext,
    useEffect,
    useReducer,
    useCallback,
    useMemo,
} from 'react'
import { taskReducer, TASK_ACTIONS } from '../reducer/taskReducer'
import { taskDefault } from '../utils/storage'

const TaskContext = createContext()

const getInitialState = () => {
    const saved = localStorage.getItem('todos')
    return saved ? JSON.parse(saved) : taskDefault
}

export default function TaskProvider({ children }) {
    const [taskItems, dispatch] = useReducer(taskReducer, [], getInitialState)

    const createTask = useCallback(
        (taskData) => {
            const newTask = {
                id: Date.now(),
                ...taskData,
                status: 'todo',
                createdAt: new Date().toISOString(),
            }
            dispatch({ type: TASK_ACTIONS.ADD_TASK, payload: newTask })
        },
        [dispatch]
    )

    const updateTask = useCallback(
        (id, updates) => {
            dispatch({
                type: TASK_ACTIONS.UPDATE_TASK,
                payload: { id, ...updates },
            })
        },
        [dispatch]
    )

    const moveTask = useCallback(
        (id, status) => {
            dispatch({
                type: TASK_ACTIONS.UPDATE_TASK,
                payload: { id, status },
            })
        },
        [dispatch]
    )

    const removeFromTask = useCallback(
        (id) => {
            dispatch({ type: TASK_ACTIONS.DELETE_TASK, payload: id })
        },
        [dispatch]
    )

    const clearTask = useCallback(() => {
        dispatch({ type: TASK_ACTIONS.CLEAR_TASKS })
    }, [dispatch])

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(taskItems))
    }, [taskItems])

    const contextValue = useMemo(
        () => ({
            taskItems,
            createTask,
            updateTask,
            removeFromTask,
            clearTask,
            moveTask,
        }),
        [taskItems, createTask, updateTask, removeFromTask, clearTask, moveTask]
    )

    return (
        <TaskContext.Provider value={contextValue}>
            {children}
        </TaskContext.Provider>
    )
}

export { TaskContext }
