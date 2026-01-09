export default function Textarea({
    label,
    name,
    register,
    validation,
    errors,
    placeholder,
    rows = 4,
    className = '',
}) {
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

            <textarea
                {...register(name, validation)}
                rows={rows}
                placeholder={placeholder}
                className={`w-full px-4 py-2 rounded-lg border bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent outline-none transition-all resize-none
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
