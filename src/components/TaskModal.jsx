import { useEffect, Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useTask } from '../hooks/useTask'
import useAlert from '../hooks/useAlert'
import Input from './ui/Input'
import Textarea from './ui/Textarea'
import Select from './ui/Select'

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
                    priority: 'medium',
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

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all border border-gray-200 dark:border-gray-700">
                                <div className="flex justify-between items-center mb-6">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-2xl font-bold leading-6 text-gray-900 dark:text-white"
                                    >
                                        {taskToEdit ? 'Edit Task' : 'New Task'}
                                    </Dialog.Title>
                                    <button
                                        onClick={onClose}
                                        className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors focus:outline-none"
                                    >
                                        <XMarkIcon className="h-6 w-6" />
                                    </button>
                                </div>

                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="space-y-2"
                                >
                                    {/* 1. เรียกใช้ Input Component */}
                                    <Input
                                        label="Title"
                                        name="title"
                                        placeholder="Enter task title..."
                                        register={register}
                                        errors={errors}
                                        validation={{
                                            required: 'กรุณากรอกหัวข้อ',
                                        }}
                                    />

                                    {/* 2. เรียกใช้ Textarea Component */}
                                    <Textarea
                                        label="Description"
                                        name="description"
                                        placeholder="What needs to be done?"
                                        register={register}
                                        errors={errors}
                                        validation={{
                                            required: 'กรุณากรอกรายละเอียด',
                                        }}
                                    />

                                    {/* 3. เรียกใช้ Select Component */}
                                    <Select
                                        label="Priority"
                                        name="priority"
                                        register={register}
                                        options={[
                                            { value: 'low', label: '🟢 Low' },
                                            {
                                                value: 'medium',
                                                label: '🟡 Medium',
                                            },
                                            { value: 'high', label: '🔴 High' },
                                        ]}
                                    />

                                    <div className="mt-8 flex justify-end gap-3">
                                        <button
                                            type="button"
                                            onClick={onClose}
                                            className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-lg shadow-blue-500/30"
                                        >
                                            {taskToEdit
                                                ? 'Save Changes'
                                                : 'Create Task'}
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default TaskModal
