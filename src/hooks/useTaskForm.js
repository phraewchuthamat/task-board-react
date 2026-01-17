import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTask } from './useTask'
import useAlert from './useAlert'

export default function useTaskForm({ taskToEdit, isOpen, onClose }) {
    const { createTask, updateTask } = useTask()
    const { setAlert } = useAlert()

    const form = useForm({
        defaultValues: {
            title: '',
            description: '',
            priority: 'medium',
        },
    })

    const { reset } = form

    useEffect(() => {
        if (!isOpen) return

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
    }, [isOpen, taskToEdit, reset])

    const onSubmit = (data) => {
        if (taskToEdit) {
            updateTask(taskToEdit.id, data)
            setAlert('Edit task finish!', 'success')
        } else {
            createTask(data)
            setAlert('Create new task successfully!', 'success')
        }
        onClose()
    }

    return {
        ...form,
        onSubmit,
        isEditMode: !!taskToEdit,
    }
}
