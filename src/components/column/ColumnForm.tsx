import { useState, FormEvent } from 'react'
import Button from '../ui/Button'

import { CheckIcon } from '@heroicons/react/24/outline'
import Input from '../ui/Input'
import { COLUMN_COLORS } from '../../utils/formatters'

// 1. กำหนด Props
interface ColumnFormProps {
    onSave: (title: string, color: string) => void
    onCancel: () => void
    initialData?: {
        title?: string
        color?: string
    }
}

export default function ColumnForm({
    onSave,
    onCancel,
    initialData,
}: ColumnFormProps) {
    const [title, setTitle] = useState(initialData?.title || '')

    const [selectedColor, setSelectColor] = useState(() => {
        return initialData?.color || 'bg-gray-500'
    })

    const [error, setError] = useState('')

    // 2. กำหนด Type ให้ Event (FormEvent)
    const handleSubmit = (e: FormEvent) => {
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
                        setError('') // Clear error เมื่อ user พิมพ์
                    }}
                    placeholder="Enter column title..."
                    // ส่ง error ไปให้ Input component จัดการแสดงผลเอง (ลดโค้ดซ้ำซ้อน)
                    error={error}
                    autoFocus
                />
            </div>

            <div>
                <span className="text-xs text-app-subtle mb-2 mt-1 block">
                    Select Color:
                </span>
                <div className="flex flex-wrap gap-3">
                    {/* Object.entries จะ return [string, string][] */}
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
