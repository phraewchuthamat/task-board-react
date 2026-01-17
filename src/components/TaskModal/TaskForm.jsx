import Input from '../ui/Input'
import Textarea from '../ui/Textarea'
import Select from '../ui/Select'
import Button from '../ui/Button'
import { PRIORITY_OPTIONS } from '../../utils/formatters'

export default function TaskForm({ form, onSubmit, isEditMode, onCancel }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = form

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
                label="Title"
                name="title"
                placeholder="Enter task title..."
                register={register}
                errors={errors}
                validation={{ required: 'กรุณากรอกหัวข้อ' }}
            />

            <Textarea
                label="Description"
                name="description"
                placeholder="What needs to be done?"
                register={register}
                errors={errors}
                validation={{ required: 'กรุณากรอกรายละเอียด' }}
            />

            <Select
                label="Priority"
                name="priority"
                register={register}
                options={PRIORITY_OPTIONS}
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
