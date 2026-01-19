import Input from '../ui/Input'
import Textarea from '../ui/Textarea'
import Select from '../ui/Select'
import Button from '../ui/Button'
import { PRIORITY_OPTIONS } from '../../utils/formatters'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import { TaskFormData } from '../../hooks/task/useTaskForm'

interface TaskFormProps {
    form: UseFormReturn<TaskFormData>
    onSubmit: SubmitHandler<TaskFormData>
    isEditMode: boolean
    onCancel: () => void
}

export default function TaskForm({
    form,
    onSubmit,
    isEditMode,
    onCancel,
}: TaskFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = form

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
                label="Title"
                placeholder="Enter task title..."
                {...register('title', {
                    required: 'Task title is required',
                })}
                error={errors.title}
            />

            <Textarea
                label="Description"
                placeholder="Enter details..."
                {...register('description', {
                    required: 'Task description is required',
                })}
                error={errors.description}
            />

            <Select
                label="Priority"
                {...register('priority')}
                options={PRIORITY_OPTIONS}
                error={errors.priority}
            />

            <div className="mt-8 flex justify-end gap-3">
                <Button type="button" variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>

                <Button type="submit" variant="primary">
                    {isEditMode ? 'Save Changes' : 'Create Task'}
                </Button>
            </div>
        </form>
    )
}
