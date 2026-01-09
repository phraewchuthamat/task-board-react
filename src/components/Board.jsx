import { useTask } from '../hooks/useTask'
import Column from './ui/Column'
import { DndContext } from '@dnd-kit/core' // 1. Import

function Board() {
    const { taskItems, moveTask } = useTask()

    const todoTasks = taskItems.filter((task) => task.status === 'todo')
    const doingTasks = taskItems.filter((task) => task.status === 'doing')
    const doneTasks = taskItems.filter((task) => task.status === 'done')

    // 2. ฟังก์ชันนี้จะทำงานเมื่อ "ปล่อยเมาส์"
    const handleDragEnd = (event) => {
        const { active, over } = event

        // ถ้าไม่ได้ปล่อยลงในพื้นที่ Droppable (over เป็น null) ก็ไม่ต้องทำอะไร
        if (!over) return

        const taskId = active.id // ไอดีของการ์ดที่ลาก
        const newStatus = over.id // ไอดีของคอลัมน์ที่ปล่อยลง (status ใหม่)

        // เรียกใช้ฟังก์ชันย้ายงานใน Context
        moveTask(taskId, newStatus)
    }

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="flex flex-row gap-4 p-4 h-full overflow-x-auto items-start justify-center min-h-screen bg-gray-900 text-white">
                <Column title="To Do" tasks={todoTasks} status="todo" />
                <Column title="Doing" tasks={doingTasks} status="doing" />
                <Column title="Done" tasks={doneTasks} status="done" />
            </div>
        </DndContext>
    )
}

export default Board
