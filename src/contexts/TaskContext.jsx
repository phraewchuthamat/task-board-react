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
import { DEFAULT_COLUMNS } from '../utils/formatters'

const TaskContext = createContext()

export default function TaskProvider({ children }) {
    const [taskItems, dispatch] = useReducer(taskReducer, [])
    const [isLoading, setIsLoading] = useState(true)

    const [columns, setColumns] = useState(() => {
        const savedCols = localStorage.getItem('board_columns')

        if (savedCols) {
            const parsed = JSON.parse(savedCols)
            return parsed.map((col) => ({
                ...col,
                color: col.color || 'bg-gray-500',
            }))
        }

        return DEFAULT_COLUMNS
    })

    useEffect(() => {
        const fetchTasks = async () => {
            setIsLoading(true)
            await new Promise((resolve) => setTimeout(resolve, 1000))

            const saved = localStorage.getItem('todos')
            const initialData = saved ? JSON.parse(saved) : taskDefault

            dispatch({ type: TASK_ACTIONS.INIT_TASK, payload: initialData })

            setIsLoading(false)
        }

        fetchTasks()
    }, [])

    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem('todos', JSON.stringify(taskItems))
        }
    }, [taskItems, isLoading])

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

    const addColumn = useCallback((title, color) => {
        if (!title || !title.trim()) return

        const newStatus = title.trim().toLowerCase().replace(/\s+/g, '-')

        setColumns((prev) => {
            if (prev.some((col) => col.status === newStatus)) return prev
            return [...prev, { title: title.trim(), status: newStatus, color }]
        })
    }, [])

    const updateColumn = useCallback((status, newTitle, newColor) => {
        setColumns((prev) =>
            prev.map((col) => {
                if (col.status === status) {
                    return {
                        ...col,
                        title: newTitle,
                        color: newColor || col.color,
                    }
                }
                return col
            })
        )
    }, [])

    const deleteColumn = useCallback((status) => {
        setColumns((prev) => prev.filter((col) => col.status !== status))
    }, [])

    useEffect(() => {
        localStorage.setItem('board_columns', JSON.stringify(columns))
    }, [columns])

    const contextValue = useMemo(
        () => ({
            taskItems,
            isLoading,
            createTask,
            updateTask,
            removeFromTask,
            clearTask,
            moveTask,
            columns,
            addColumn,
            updateColumn,
            deleteColumn,
        }),
        [
            taskItems,
            isLoading,
            createTask,
            updateTask,
            removeFromTask,
            clearTask,
            moveTask,
            columns,
            addColumn,
            updateColumn,
            deleteColumn,
        ]
    )

    return (
        <TaskContext.Provider value={contextValue}>
            {children}
        </TaskContext.Provider>
    )
}

export { TaskContext }
