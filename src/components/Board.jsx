import { useTask } from '../hooks/useTask'
import Column from './ui/Column'

function Board() {
    const { taskItems } = useTask()

    const todoTask = taskItems.filter((task) => task.status === 'todo')
    const dingTask = taskItems.filter((task) => task.status === 'doing')
    const doneTask = taskItems.filter((task) => task.status === 'done')

    return (
        <div>
            <Column title="todo" tasks={todoTask} />
            <Column title="doing" tasks={dingTask} />
            <Column title="done" tasks={doneTask} />
        </div>
    )
}

export default Board
