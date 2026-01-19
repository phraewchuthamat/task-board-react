import { memo, useMemo, useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import BoardLayout from './BoardLayout'
import Button from '../ui/Button'
import TaskColumn from '../column/TaskColumn'
import ColumnForm from '../column/ColumnForm'
import { useAlert } from '../../contexts/AlertContext' // ใช้ Context ที่เราทำ
import { useColumns } from '../../contexts/ColumnContext'
import { Task } from '../../utils/storage'

interface BoardColumnsProps {
    tasks: Task[]
    onEdit: (task: Task) => void
}

const BoardColumns = ({ tasks, onEdit }: BoardColumnsProps) => {
    const { columns, addColumn } = useColumns()
    const { setAlert } = useAlert()
    const [isCreating, setIsCreating] = useState(false)

    const tasksByStatus = useMemo(() => {
        const grouped: Record<string, Task[]> = {}

        columns.forEach((col) => {
            grouped[col.status] = []
        })

        tasks.forEach((task) => {
            if (!grouped[task.status]) {
                grouped[task.status] = []
            }
            grouped[task.status].push(task)
        })

        return grouped
    }, [tasks, columns])

    const handleSaveColumn = (title: string, color: string) => {
        addColumn(title, color)
        setIsCreating(false)
        setAlert('Create new column successfully!', 'success')
    }

    return (
        <BoardLayout>
            {columns.map((col) => (
                <TaskColumn
                    key={col.id}
                    id={col.id}
                    title={col.title}
                    status={col.status}
                    color={col.color}
                    tasks={tasksByStatus[col.status] || []}
                    onEdit={onEdit}
                />
            ))}

            <div className="shrink-0 w-80">
                {isCreating ? (
                    <ColumnForm
                        onSave={handleSaveColumn}
                        onCancel={() => setIsCreating(false)}
                    />
                ) : (
                    <Button
                        variant="secondary"
                        onClick={() => setIsCreating(true)}
                        className="w-full h-[56px] border-dashed border-2 bg-transparent hover:bg-app-surface/50 text-app-subtle hover:text-app-primary hover:border-app-primary transition-all"
                    >
                        <PlusIcon className="w-5 h-5 mr-2" />
                        Add New Column
                    </Button>
                )}
            </div>
        </BoardLayout>
    )
}

export default memo(BoardColumns)
