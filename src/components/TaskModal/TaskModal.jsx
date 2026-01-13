import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import useTaskForm from './useTaskForm'
import TaskForm from './TaskForm'

export default function TaskModal({ isOpen, onClose, taskToEdit }) {
    const form = useTaskForm({ isOpen, onClose, taskToEdit })

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-xl rounded-2xl bg-white p-6">
                        <div className="flex justify-between mb-6">
                            <Dialog.Title className="text-2xl font-bold">
                                {form.isEditMode ? 'Edit Task' : 'New Task'}
                            </Dialog.Title>

                            <button onClick={onClose}>
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>

                        <TaskForm
                            form={form}
                            onSubmit={form.onSubmit}
                            isEditMode={form.isEditMode}
                            onCancel={onClose}
                        />
                    </Dialog.Panel>
                </div>
            </Dialog>
        </Transition>
    )
}
