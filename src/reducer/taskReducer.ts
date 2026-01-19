import { Task } from '../utils/storage'
import { arrayMove } from '@dnd-kit/sortable'

export const TASK_ACTIONS = {
    ADD_TASK: 'ADD_TASK',
    DELETE_TASK: 'DELETE_TASK',
    UPDATE_TASK: 'UPDATE_TASK',
    CLEAR_TASK: 'CLEAR_TASK',
    INIT_TASK: 'INIT_TASK',
    REORDER_TASK: 'REORDER_TASK',
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

type ReorderTaskAction = {
    type: typeof TASK_ACTIONS.REORDER_TASK
    payload: { activeId: string; overId: string }
}

export type TaskAction =
    | AddTaskAction
    | UpdateTaskAction
    | DeleteTaskAction
    | ClearTaskAction
    | InitTaskAction
    | ReorderTaskAction

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

        case TASK_ACTIONS.REORDER_TASK: {
            const { activeId, overId } = action.payload

            const oldIndex = state.findIndex((t) => t.id === activeId)
            const newIndex = state.findIndex((t) => t.id === overId)

            if (oldIndex !== -1 && newIndex !== -1) {
                return arrayMove(state, oldIndex, newIndex)
            }
            return state
        }

        default:
            return state
    }
}
