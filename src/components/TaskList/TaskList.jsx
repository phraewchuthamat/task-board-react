import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { memo, useCallback, useMemo } from 'react'
import { useTask } from '../../hooks/useTask'
import useAlert from '../../hooks/useAlert'
import TaskCard from '../TaskCard/TaskCard'

const TaskList = memo(({ tasks, onEdit }) => {
    const taskIds = useMemo(() => tasks.map((t) => t.id), [tasks])

    const { removeFromTask } = useTask()
    const { setAlert } = useAlert()

    const handleDeleteTask = useCallback(
        (taskId) => {
            removeFromTask(taskId)
            setAlert('ลบข้อมูลสำเร็จ!', 'success')
        },
        [removeFromTask, setAlert]
    )

    return (
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
            {tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={handleDeleteTask}
                />
            ))}
        </SortableContext>
    )
})

export default TaskList
