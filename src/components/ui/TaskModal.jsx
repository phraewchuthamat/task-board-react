import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTask } from '../../hooks/useTask'

function TaskModal({ isOpen, onClose }) {
    const { createTask } = useTask()
    // 1. ใช้ useForm จัดการทุกอย่าง (ไม่ต้องมี useState สำหรับ field แล้ว)
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }, // ดึง errors มาโชว์
    } = useForm()

    // ล้างค่าในฟอร์มทุกครั้งที่ Modal ถูกเปิดขึ้นมาใหม่ หรือปิดไป
    useEffect(() => {
        if (!isOpen) {
            reset()
        }
    }, [isOpen, reset])

    // 2. data จะถูกส่งมาจาก handleSubmit อัตโนมัติ
    const onSubmit = (data) => {
        const taskData = {
            title: data.title,
            description: data.description,
            priority: data.priority,
        }

        createTask(taskData)
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg w-96">
                <h2 className="text-xl text-white mb-4">Add New Task</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* --- Title Input --- */}
                    <div className="mb-4">
                        <label className="block text-white mb-1">Title *</label>
                        <input
                            {...register('title', {
                                required: 'กรุณากรอกหัวข้อ',
                            })} // ✅ ใช้ register แทน value/onChange
                            type="text"
                            placeholder="Title Task..."
                            className="w-full border-2 border-gray-600 bg-gray-700 text-white p-2 rounded outline-none focus:border-blue-500"
                        />
                        {errors.title && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* --- Description Input --- */}
                    <div className="mb-4">
                        <label className="block text-white mb-1">
                            Description *
                        </label>
                        <textarea
                            {...register('description', {
                                required: 'กรุณากรอกรายละเอียด',
                            })}
                            rows="3"
                            placeholder="Description of task"
                            className="w-full border-2 border-gray-600 bg-gray-700 text-white p-2 rounded outline-none focus:border-blue-500"
                        />
                        {errors.description && (
                            <p className="text-red-400 text-sm mt-1">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    {/* --- Priority Select (ใช้ HTML ธรรมดา ง่ายกว่า Controller) --- */}
                    <div className="mb-6">
                        <label className="block text-white mb-1">
                            Priority *
                        </label>
                        <select
                            {...register('priority', { required: true })}
                            className="w-full border-2 border-gray-600 bg-gray-700 text-white p-2 rounded outline-none focus:border-blue-500"
                            defaultValue="medium" // ค่าเริ่มต้น
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    {/* --- Buttons --- */}
                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-400 hover:text-white px-4 py-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TaskModal
