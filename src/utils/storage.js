export const taskDefault = [
    {
        id: '1',
        title: 'Design UI',
        description: 'ออกแบบหน้าจอ Dashboard ใหม่ทั้งหมด',
        priority: 'high',
        createdAt: new Date().toISOString(),
        status: 'todo',
    },
    {
        id: '2',
        title: 'Integration API',
        description: 'เชื่อมต่อ API กับ Backend',
        priority: 'medium',
        createdAt: new Date().toISOString(),
        status: 'doing',
    },
    {
        id: '3',
        title: 'Fix Bugs',
        description: 'แก้บั๊กหน้า Login เข้าสู่ระบบไม่ได้',
        priority: 'low',
        createdAt: new Date().toISOString(),
        status: 'done',
    },
]
