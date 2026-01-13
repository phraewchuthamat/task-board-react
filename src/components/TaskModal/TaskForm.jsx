import Input from '../ui/Input'
import Textarea from '../ui/Textarea'
import Select from '../ui/Select'

export default function TaskForm({ form, onSubmit, isEditMode, onCancel }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = form

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
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
                options={[
                    { value: 'low', label: 'Low' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'high', label: 'High' },
                ]}
            />

            <div className="mt-8 flex justify-end gap-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-5 py-2 rounded-lg text-sm font-medium text-white border-solid bg-red-400"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="px-5 py-2 rounded-lg text-sm font-medium text-white bg-blue-500"
                >
                    {isEditMode ? 'Save Changes' : 'Create Task'}
                </button>
            </div>
        </form>
    )
}
