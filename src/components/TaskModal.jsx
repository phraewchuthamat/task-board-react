import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTask } from '../hooks/useTask'
import useAlert from '../hooks/useAlert'

function TaskModal({ isOpen, onClose, taskToEdit }) {
    const { createTask, updateTask } = useTask()
    const { setAlert } = useAlert()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    useEffect(() => {
        if (isOpen) {
            if (taskToEdit) {
                reset({
                    title: taskToEdit.title,
                    description: taskToEdit.description,
                    priority: taskToEdit.priority,
                })
            } else {
                reset({
                    title: '',
                    description: '',
                    priority: '',
                })
            }
        }
    }, [isOpen, taskToEdit, reset])

    const onSubmit = (data) => {
        if (taskToEdit) {
            updateTask(taskToEdit.id, data)
            setAlert('แก้ไขงานสำเร็จ!', 'success')
        } else {
            createTask(data)
            setAlert('สร้างงานใหม่สำเร็จ!', 'success')
        }
        onClose()
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-6 rounded-lg w-96">
                <h2 className="text-xl text-white mb-4">
                    {taskToEdit ? 'Edit Task' : 'New Task'}
                </h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* --- Title Input --- */}
                    <div className="mb-4">
                        <label className="block text-white mb-1">Title *</label>
                        <input
                            {...register('title', {
                                required: 'กรุณากรอกหัวข้อ',
                            })}
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
                            defaultValue="medium"
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
                            onClick={() =>
                                setAlert('บันทึกข้อมูลสำเร็จ!', 'success')
                            }
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                        >
                            {taskToEdit ? 'Save Changes' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TaskModal
