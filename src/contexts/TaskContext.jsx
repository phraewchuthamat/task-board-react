import {
    createContext,
    useEffect,
    useReducer,
    useCallback,
    useMemo,
    useState,
} from 'react'
import { taskReducer, TASK_ACTIONS } from '../reducer/taskReducer'
import { taskDefault } from '../utils/storage'

const TaskContext = createContext()

export default function TaskProvider({ children }) {
    const [taskItems, dispatch] = useReducer(taskReducer, [])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchTasks = async () => {
            setIsLoading(true)
            try {
                await new Promise((resolve) => setTimeout(resolve, 1000))

                const saved = localStorage.getItem('todos')
                const initialData = saved ? JSON.parse(saved) : taskDefault

                dispatch({ type: TASK_ACTIONS.INIT_TASK, payload: initialData })
            } catch (error) {
                console.log('Fteching Data error:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchTasks()
    }, [])

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
        dispatch({ type: TASK_ACTIONS.CLEAR_TASK })
    }, [dispatch])

    const refetchTask = useCallback(async () => {
        setIsLoading(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))

            const saved = localStorage.getItem('todos')
            const data = saved ? JSON.parse(saved) : taskDefault

            dispatch({ type: TASK_ACTIONS.INIT_TASK, payload: data })
        } catch (error) {
            console.error('Fetch error:', error)
        } finally {
            setIsLoading(false)
        }
    }, [dispatch])

    useEffect(() => {
        refetchTask()
    }, [refetchTask])

    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem('todos', JSON.stringify(taskItems))
        }
    }, [taskItems, isLoading])

    const contextValue = useMemo(
        () => ({
            taskItems,
            isLoading,
            createTask,
            updateTask,
            removeFromTask,
            clearTask,
            refetchTask,
            moveTask,
        }),
        [
            taskItems,
            isLoading,
            createTask,
            updateTask,
            removeFromTask,
            clearTask,
            refetchTask,
            moveTask,
        ]
    )

    return (
        <TaskContext.Provider value={contextValue}>
            {children}
        </TaskContext.Provider>
    )
}

export { TaskContext }
