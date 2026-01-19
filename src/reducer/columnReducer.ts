import { Column } from './../utils/storage'

export const COLUMN_ACTIONS = {
    CREATE_COLUMN: 'CREATE_COLUMN',
    UPDATE_COLUMN: 'UPDATE_COLUMN',
    DELETE_COLUMN: 'DELETE_COLUMN',
    INIT_COLUMN: 'INIT_COLUMN',
} as const

type CreateColumnAction = {
    type: typeof COLUMN_ACTIONS.CREATE_COLUMN
    payload: Column
}

type UpdateColumnAction = {
    type: typeof COLUMN_ACTIONS.UPDATE_COLUMN
    payload: Partial<Column> & { id: string }
}

type DeleteColumnAction = {
    type: typeof COLUMN_ACTIONS.DELETE_COLUMN
    payload: string // ID
}

type InitColumnAction = {
    type: typeof COLUMN_ACTIONS.INIT_COLUMN
    payload: Column[]
}

export type ColumnAction =
    | CreateColumnAction
    | UpdateColumnAction
    | DeleteColumnAction
    | InitColumnAction

export function columnReducer(state: Column[], action: ColumnAction): Column[] {
    switch (action.type) {
        case COLUMN_ACTIONS.CREATE_COLUMN: {
            if (state.some((col) => col.status === action.payload.status)) {
                return state
            }
            return [...state, action.payload]
        }

        case COLUMN_ACTIONS.UPDATE_COLUMN: {
            return state.map((col) =>
                col.id === action.payload.id
                    ? { ...col, ...action.payload }
                    : col
            )
        }

        case COLUMN_ACTIONS.DELETE_COLUMN: {
            return state.filter((col) => col.id !== action.payload)
        }

        case COLUMN_ACTIONS.INIT_COLUMN: {
            return action.payload
        }

        default:
            return state
    }
}
