export const COLUMN_ACTIONS = {
    CREATE_COLUMN: 'CREATE_COLUMN',
    UPDATE_COLUMN: 'UPDATE_COLUMN',
    DELETE_COLUMN: 'DELETE_COLUMN',
    INIT_COLUMN: 'INIT_COLUMN',
}

export function columnReducer(state, action) {
    switch (action.type) {
        case COLUMN_ACTIONS.CREATE_COLUMN: {
            // เช็คว่า Status ซ้ำไหม (ป้องกัน Logic ผิดพลาดที่ Reducer)
            if (state.some((col) => col.status === action.payload.status)) {
                return state
            }
            return [...state, action.payload]
        }

        case COLUMN_ACTIONS.UPDATE_COLUMN: {
            return state.map((col) =>
                col.id === action.payload.id
                    ? { ...col, ...action.payload } // Merge ค่าใหม่
                    : col
            )
        }

        case COLUMN_ACTIONS.DELETE_COLUMN: {
            // ลบโดยใช้ ID แม่นยำกว่า Status
            return state.filter((col) => col.id !== action.payload)
        }

        case COLUMN_ACTIONS.INIT_COLUMN: {
            return action.payload
        }

        default:
            return state
    }
}
