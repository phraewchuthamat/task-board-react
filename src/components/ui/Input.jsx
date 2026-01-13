export default function Input({
    label,
    name,
    type = 'text',
    register,
    validation, // รับกฎการตรวจสอบ (Validation Rules)
    errors, // รับ object errors เพื่อเช็คว่ามี error ไหม
    placeholder,
    className = '',
}) {
    // เช็คว่ามี error ใน field นี้ไหม
    const hasError = errors && errors[name]

    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {label}{' '}
                    {validation?.required && (
                        <span className="text-red-500">*</span>
                    )}
                </label>
            )}

            <input
                {...register(name, validation)}
                type={type}
                placeholder={placeholder}
                className={`w-full px-4 py-2 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent outline-none transition-all
                    ${
                        hasError
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                    }
                `}
            />

            {hasError && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                    {hasError.message}
                </p>
            )}
        </div>
    )
}
