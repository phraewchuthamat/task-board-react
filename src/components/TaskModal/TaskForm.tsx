import Input from '../ui/Input'
import Textarea from '../ui/Textarea'
import Select from '../ui/Select'
import Button from '../ui/Button'
import { PRIORITY_OPTIONS } from '../../utils/formatters'
import { SubmitHandler, UseFormReturn } from 'react-hook-form'
import { TaskFormData } from '../../hooks/task/useTaskForm'
import { useLanguage } from '../../contexts/LanguageContext'

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

    const { trans } = useLanguage()
    const transLatedPriorityOptions = PRIORITY_OPTIONS.map((option) => ({
        value: option.value,
        label: trans(option.label),
    }))

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
                label={trans('label_title')}
                placeholder={trans('label_title')}
                {...register('title', {
                    required: 'Task title is required',
                })}
                error={errors.title}
            />

            <Textarea
                label={trans('label_desc')}
                placeholder={trans('label_desc')}
                {...register('description', {
                    required: 'Task description is required',
                })}
                error={errors.description}
            />

            <Select
                label={trans('label_priority')}
                {...register('priority')}
                options={transLatedPriorityOptions}
                error={errors.priority}
            />

            <div className="mt-8 flex justify-end gap-3">
                <Button type="button" variant="secondary" onClick={onCancel}>
                    {trans('btn_cancel')}
                </Button>

                <Button type="submit" variant="primary">
                    {isEditMode
                        ? `${trans('btn_edit')}`
                        : `${trans('btn_save')}`}
                </Button>
            </div>
        </form>
    )
}
