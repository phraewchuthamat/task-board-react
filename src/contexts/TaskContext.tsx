import {
    createContext,
    useEffect,
    useReducer,
    useCallback,
    useMemo,
    useState,
    ReactNode,
    useContext,
} from 'react'
import { taskReducer, TASK_ACTIONS } from '../reducer/taskReducer'
import { taskDefault, Task, TaskStatus } from '../utils/storage'

interface TaskContextType {
    taskItems: Task[]
    isLoading: boolean
    createTask: (taskData: Omit<Task, 'id' | 'createdAt' | 'status'>) => void
    updateTask: (id: string, updates: Partial<Task>) => void
    moveTask: (id: string, status: TaskStatus) => void
    removeFromTask: (id: string) => void
    clearTask: () => void
    refetchTask: () => Promise<void>
}

const TaskContext = createContext<TaskContextType | undefined>(undefined)

interface TaskProviderProps {
    children: ReactNode
}

export default function TaskProvider({ children }: TaskProviderProps) {
    const [taskItems, dispatch] = useReducer(taskReducer, [])
    const [isLoading, setIsLoading] = useState(true)

    const performFetch = useCallback(async () => {
        setIsLoading(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))

            const saved = localStorage.getItem('todos')
            const initialData: Task[] = saved ? JSON.parse(saved) : taskDefault

            dispatch({ type: TASK_ACTIONS.INIT_TASK, payload: initialData })
        } catch (error) {
            console.error('Fetching Data error:', error)
            dispatch({ type: TASK_ACTIONS.INIT_TASK, payload: taskDefault })
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        performFetch()
    }, [performFetch])

    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem('todos', JSON.stringify(taskItems))
        }
    }, [taskItems, isLoading])

    const createTask = useCallback(
        (taskData: Omit<Task, 'id' | 'createdAt' | 'status'>) => {
            const newTask: Task = {
                id: Date.now().toString(),
                ...taskData,
                status: 'todo',
                createdAt: new Date().toISOString(),
            }
            dispatch({ type: TASK_ACTIONS.ADD_TASK, payload: newTask })
        },
        [dispatch]
    )

    const updateTask = useCallback(
        (id: string, updates: Partial<Task>) => {
            dispatch({
                type: TASK_ACTIONS.UPDATE_TASK,
                payload: { id, ...updates },
            })
        },
        [dispatch]
    )

    const moveTask = useCallback(
        (id: string, status: TaskStatus) => {
            dispatch({
                type: TASK_ACTIONS.UPDATE_TASK,
                payload: { id, status },
            })
        },
        [dispatch]
    )

    const removeFromTask = useCallback(
        (id: string) => {
            dispatch({ type: TASK_ACTIONS.DELETE_TASK, payload: id })
        },
        [dispatch]
    )

    const clearTask = useCallback(() => {
        dispatch({ type: TASK_ACTIONS.CLEAR_TASK })
    }, [dispatch])

    const refetchTask = performFetch

    // ลบ useEffect ซ้ำซ้อนออก (คุณมี logic save localStorage 2 รอบในไฟล์เดิม)

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

export const useTasks = () => {
    const context = useContext(TaskContext)

    if (!context) {
        throw new Error('useTask must be used within a taskContext')
    }

    return context
}

export { TaskContext }
