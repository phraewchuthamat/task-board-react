import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useReducer,
} from 'react'
import { columnReducer, COLUMN_ACTIONS } from '../reducer/columnReducer'
import { DEFAULT_COLUMNS } from '../utils/storage'

const ColumnContext = createContext()

const initColumns = () => {
    const savedCols = localStorage.getItem('board_columns')
    if (savedCols) {
        try {
            return JSON.parse(savedCols)
        } catch (error) {
            console.error('Error parsing columns from storage', error)
            return DEFAULT_COLUMNS
        }
    }
    return DEFAULT_COLUMNS
}

export default function ColumnProvider({ children }) {
    const [columns, dispatch] = useReducer(columnReducer, [], initColumns)

    useEffect(() => {
        localStorage.setItem('board_columns', JSON.stringify(columns))
    }, [columns])

    const addColumn = useCallback((title, color) => {
        if (!title || !title.trim()) return

        const formattedStatus = title.trim().toLowerCase().replace(/\s+/g, '-')

        const newColumn = {
            id: Date.now().toString(),
            title: title.trim(),
            status: formattedStatus,
            color: color || 'bg-gray-500',
        }

        dispatch({
            type: COLUMN_ACTIONS.CREATE_COLUMN,
            payload: newColumn,
        })
    }, [])

    const updateColumn = useCallback((id, updates) => {
        dispatch({
            type: COLUMN_ACTIONS.UPDATE_COLUMN,
            payload: { id, ...updates },
        })
    }, [])

    const deleteColumn = useCallback((id) => {
        dispatch({
            type: COLUMN_ACTIONS.DELETE_COLUMN,
            payload: id,
        })
    }, [])

    const value = useMemo(
        () => ({
            columns,
            addColumn,
            updateColumn,
            deleteColumn,
        }),
        [columns, addColumn, updateColumn, deleteColumn]
    )

    return (
        <ColumnContext.Provider value={value}>
            {children}
        </ColumnContext.Provider>
    )
}

export { ColumnContext }
