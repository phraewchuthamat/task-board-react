import { memo } from 'react'
import Column from '../column/Column'
import BoardLayout from './BoardLayout'
import { BOARD_COLUMNS } from '../../utils/formatters'

const BoardColumns = ({ tasks, onEdit }) => {
    return (
        <BoardLayout>
            {BOARD_COLUMNS.map((col) => (
                <Column
                    key={col.status}
                    title={col.title}
                    status={col.status}
                    tasks={tasks.filter((t) => t.status === col.status)}
                    onEdit={onEdit}
                />
            ))}
        </BoardLayout>
    )
}

export default memo(BoardColumns)
