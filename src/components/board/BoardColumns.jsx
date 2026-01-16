import { memo } from 'react'
import Column from '../column/Column'

const BoardColumns = ({ tasks, onEdit }) => {
    const columns = [
        { title: 'To Do', status: 'todo' },
        { title: 'Doing', status: 'doing' },
        { title: 'Done', status: 'done' },
    ]

    return (
        <div className="container mx-auto px-6 pb-6 mt-4">
            <div className="flex gap-6 justify-center">
                {columns.map((col) => (
                    <Column
                        key={col.status}
                        title={col.title}
                        status={col.status}
                        tasks={tasks.filter((t) => t.status === col.status)}
                        onEdit={onEdit}
                    />
                ))}
            </div>
        </div>
    )
}

export default memo(BoardColumns)
