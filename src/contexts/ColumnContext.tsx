import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useReducer,
} from 'react'
import { columnReducer, COLUMN_ACTIONS } from '../reducer/columnReducer'
import { DEFAULT_COLUMNS, Column, TaskStatus } from '../utils/storage'

interface ColumnContextType {
    columns: Column[]
    addColumn: (title: string, color?: string) => void
    updateColumn: (id: string, updates: Partial<Column>) => void
    deleteColumn: (id: string) => void
}

const ColumnContext = createContext<ColumnContextType | undefined>(undefined)

const initColumns = (): Column[] => {
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

interface ColumnProviderProps {
    children: ReactNode
}

export default function ColumnProvider({ children }: ColumnProviderProps) {
    const [columns, dispatch] = useReducer(columnReducer, [], initColumns)

    useEffect(() => {
        localStorage.setItem('board_columns', JSON.stringify(columns))
    }, [columns])

    const addColumn = useCallback((title: string, color?: string) => {
        if (!title || !title.trim()) return

        const formattedStatus = title
            .trim()
            .toLowerCase()
            .replace(/\s+/g, '-') as TaskStatus

        const newColumn: Column = {
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

    const updateColumn = useCallback((id: string, updates: Partial<Column>) => {
        dispatch({
            type: COLUMN_ACTIONS.UPDATE_COLUMN,
            payload: { id, ...updates },
        })
    }, [])

    const deleteColumn = useCallback((id: string) => {
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

export const useColumns = () => {
    const context = useContext(ColumnContext)

    if (!context)
        throw new Error('useColumns must be used within ColumnProvider')
    return context
}

export { ColumnContext }
