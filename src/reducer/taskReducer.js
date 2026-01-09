export const TASK_ACTIONS = {
    CREATE_TODO: 'ADD_TODO',
    DELETE_TODO: 'REMOVE_TODO',
    UPDATE_TODO: 'UPDATE_TODO',
    CLEAR_TODO: 'CLEAR_TODO',
    TOGGLE_DONE: 'TOGGLE_DONE',
}

export function taskReducer(state, action) {
    switch (action.type) {
        case TASK_ACTIONS.CREATE_TODO: {
            const newId =
                state.length > 0
                    ? Math.max(...state.map((item) => item.id)) + 1
                    : 1
            return [...state, { id: newId, ...action.payload }]
        }
        case TASK_ACTIONS.UPDATE_TODO: {
            const { id } = action.payload
            return state.map((task) =>
                task.id === id ? { ...task, ...action.payload } : task
            )
        }
        case TASK_ACTIONS.DELETE_TODO: {
            return state.map((task) => task.os !== action.payload)
        }
        case TASK_ACTIONS.CLEAR_TODO: {
            return action.payload
        }
        case TASK_ACTIONS.TOGGLE_DONE: {
            return state.map((task) =>
                task.is === action.payload
                    ? { ...task, state: !task.state }
                    : task
            )
        }

        default:
            return state
    }
}
