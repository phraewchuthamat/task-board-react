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

    // 2. แก้ไขงาน (รวมถึงการย้ายงานด้วย)
    // รับ updates เป็น object เช่น { title: 'New Name' } หรือ { status: 'doing' }
    const updateTask = (id, updates) => {
        // ส่ง id ไปพร้อมกับข้อมูลที่จะแก้
        dispatch({
            type: TASK_ACTIONS.UPDATE_TASK,
            payload: { id, ...updates },
        })
    }

    // 3. ย้ายงาน (ใช้ updateTask แทนได้เลย หรือจะเขียนแยกเพื่อความชัดเจนก็ได้)
    const moveTask = (id, status) => {
        // Reuse Logic ของ UPDATE_TASK
        dispatch({ type: TASK_ACTIONS.UPDATE_TASK, payload: { id, status } })
    }

    // 4. ลบงาน
    const removeFromTask = (id) => {
        dispatch({ type: TASK_ACTIONS.DELETE_TASK, payload: id })
    }

    // 5. ล้างกระดาน
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
