export type Priority = 'low' | 'medium' | 'high'

export type TaskStatus = 'draft' | 'todo' | 'doing' | 'done'

export interface Task {
    id: string
    title: string
    description: string
    status: TaskStatus
    priority: Priority
    createdAt: string
}

export const taskDefault: Task[] = [
    {
        id: '1',
        title: 'Design Wireframe Figma',
        description: 'ออกแบบ mockup figma Responsive ทุก device',
        priority: 'high',
        createdAt: new Date().toISOString(),
        status: 'draft',
    },
    {
        id: '2',
        title: 'Design UI',
        description: 'ออกแบบหน้าจอ Dashboard ใหม่ทั้งหมด',
        priority: 'high',
        createdAt: new Date().toISOString(),
        status: 'todo',
    },
    {
        id: '3',
        title: 'Integration API',
        description: 'เชื่อมต่อ API กับ Backend',
        priority: 'medium',
        createdAt: new Date().toISOString(),
        status: 'doing',
    },
    {
        id: '4',
        title: 'Fix Bugs',
        description: 'แก้บั๊กหน้า Login เข้าสู่ระบบไม่ได้',
        priority: 'low',
        createdAt: new Date().toISOString(),
        status: 'done',
    },
]

export interface Column {
    id: string
    title: string
    status: TaskStatus
    color: string
}

export const DEFAULT_COLUMNS: Column[] = [
    { id: '1', title: 'Draft', status: 'draft', color: 'bg-gray-500' },
    { id: '2', title: 'To Do', status: 'todo', color: 'bg-blue-500' },
    { id: '3', title: 'Doing', status: 'doing', color: 'bg-yellow-500' },
    { id: '4', title: 'Done', status: 'done', color: 'bg-emerald-500' },
]
