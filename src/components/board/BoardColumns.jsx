import { memo } from 'react'
import Column from '../column/Column'
import BoardLayout from './BoardLayout'
import Button from '../ui/Button'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useTask } from '../../hooks/useTask'

const BoardColumns = ({ tasks, columns, onEdit }) => {
    const { addColumn } = useTask()

    const handleAddColumn = () => {
        const title = window.prompt('Enter new column title: ')

        if (title && title.trim().length > 0) {
            addColumn(title)
        }
    }

    return (
        <BoardLayout>
            {columns.map((col) => (
                <Column
                    key={col.status}
                    title={col.title}
                    status={col.status}
                    tasks={tasks.filter((t) => t.status === col.status)}
                    onEdit={onEdit}
                />
            ))}

            <div className="shrink-0 w-80">
                <Button
                    variant="secondary"
                    onClick={handleAddColumn}
                    className="w-full h-[56px] border-dashed border-2 bg-transparent hover:bg-app-surface/50 text-app-subtle hover:text-app-primary hover:border-app-primary transition-all"
                >
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Add New Column
                </Button>
            </div>
        </BoardLayout>
    )
}

export default memo(BoardColumns)
