import { useContext } from 'react'
import { ColumnContext } from '../../contexts/ColumnContext'

export const useColumns = () => {
    const context = useContext(ColumnContext)

    if (!context)
        throw new Error('useColumns must be used within ColumnProvider')
    return context
}
