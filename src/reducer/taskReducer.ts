import { Task } from '../utils/storage'

export const TASK_ACTIONS = {
    ADD_TASK: 'ADD_TASK',
    DELETE_TASK: 'DELETE_TASK',
    UPDATE_TASK: 'UPDATE_TASK',
    CLEAR_TASK: 'CLEAR_TASK',
    INIT_TASK: 'INIT_TASK',
} as const

type AddTaskAction = {
    type: typeof TASK_ACTIONS.ADD_TASK
    payload: Task
}

type UpdateTaskAction = {
    type: typeof TASK_ACTIONS.UPDATE_TASK
    payload: Partial<Task> & { id: string }
}

type DeleteTaskAction = {
    type: typeof TASK_ACTIONS.DELETE_TASK
    payload: string
}

type ClearTaskAction = {
    type: typeof TASK_ACTIONS.CLEAR_TASK
}

type InitTaskAction = {
    type: typeof TASK_ACTIONS.INIT_TASK
    payload: Task[]
}

export type TaskAction =
    | AddTaskAction
    | UpdateTaskAction
    | DeleteTaskAction
    | ClearTaskAction
    | InitTaskAction

export function taskReducer(state: Task[], action: TaskAction): Task[] {
    switch (action.type) {
        case TASK_ACTIONS.ADD_TASK: {
            return [...state, action.payload]
        }

        case TASK_ACTIONS.UPDATE_TASK: {
            return state.map((task) =>
                task.id === action.payload.id
                    ? { ...task, ...action.payload }
                    : task
            )
        }

        case TASK_ACTIONS.DELETE_TASK: {
            return state.filter((task) => task.id !== action.payload)
        }

        case TASK_ACTIONS.CLEAR_TASK: {
            return []
        }

        case TASK_ACTIONS.INIT_TASK: {
            return action.payload
        }

        default:
            return state
    }
}
