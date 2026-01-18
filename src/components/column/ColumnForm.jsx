import { useState } from 'react'
import Button from '../ui/Button'
import { COLUMN_COLORS } from '../../utils/formatters'
import { CheckIcon } from '@heroicons/react/24/outline'
import Input from '../ui/Input'

export default function ColumnForm({ onSave, onCancel, initialData }) {
    const [title, setTitle] = useState(initialData?.title || '')

    const [selectedColor, setSelectColor] = useState(() => {
        return initialData?.color || 'bg-gray-500'
    })

    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!title.trim()) {
            setError('Column title is required')
            return
        }

        onSave(title, selectedColor)
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
                <Input
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                        setError('')
                    }}
                    placeholder="Enter column title..."
                    error={error}
                    autoFocus
                />
                {error && (
                    <span className="text-xs text-red-500 mt-1 block">
                        {error}
                    </span>
                )}
            </div>

            <div>
                <span className="text-xs text-app-subtle mb-2 mt-1 block">
                    Select Color:
                </span>
                <div className="flex flex-wrap gap-3">
                    {Object.entries(COLUMN_COLORS).map(([name, colorClass]) => (
                        <button
                            key={name}
                            type="button"
                            onClick={() => setSelectColor(colorClass)}
                            className={`
                                w-8 h-8 rounded-full ${colorClass} 
                                flex items-center justify-center
                                transition-all hover:scale-110
                                ${
                                    selectedColor === colorClass
                                        ? 'ring-2 ring-offset-2 ring-app-text scale-110 shadow-sm'
                                        : 'opacity-70 hover:opacity-100'
                                }
                            `}
                            title={name}
                        >
                            {selectedColor === colorClass && (
                                <CheckIcon className="w-5 h-5 text-white drop-shadow-md" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 justify-end pt-2">
                <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={onCancel}
                >
                    Cancel
                </Button>

                <Button type="submit" variant="primary" size="sm">
                    Save
                </Button>
            </div>
        </form>
    )
}
