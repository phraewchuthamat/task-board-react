import { useState, createContext, useCallback, useEffect, useMemo } from 'react'
import { DEFAULT_COLUMNS } from '../utils/formatters'

const ColumnContext = createContext()

export default function ColumnProvider({ children }) {
    const [columns, setColumns] = useState(() => {
        const savedCols = localStorage.getItem('board_columns')

        if (savedCols) {
            const parsed = JSON.parse(savedCols)
            return parsed.map((col) => ({
                ...col,
                color: col.color || 'bg-gray-500',
            }))
        }

        return DEFAULT_COLUMNS
    })

    useEffect(() => {
        localStorage.setItem('board_columns', JSON.stringify(columns))
    }, [columns])

    const addColumn = useCallback((title, color) => {
        if (!title || !title.trim()) return

        const newStatus = title.trim().toLowerCase().replace(/\s+/g, '-')

        setColumns((prev) => {
            if (prev.some((col) => col.status === newStatus)) return prev
            return [...prev, { title: title.trim(), status: newStatus, color }]
        })
    }, [])

    const updateColumn = useCallback((status, newTitle, newColor) => {
        setColumns((prev) =>
            prev.map((col) => {
                if (col.status === status) {
                    return {
                        ...col,
                        title: newTitle,
                        color: newColor || col.color,
                    }
                }
                return col
            })
        )
    }, [])

    const deleteColumn = useCallback((status) => {
        setColumns((prev) => prev.filter((col) => col.status !== status))
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
