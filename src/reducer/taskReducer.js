export const TASK_ACTIONS = {
    ADD_TASK: 'ADD_TASK',
    DELETE_TASK: 'DELETE_TASK',
    UPDATE_TASK: 'UPDATE_TASK',
    CLEAR_TASKS: 'CLEAR_TASKS',
}

export function taskReducer(state, action) {
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

        case TASK_ACTIONS.CLEAR_TASKS: {
            return []
        }

        default:
            return state
    }
}
