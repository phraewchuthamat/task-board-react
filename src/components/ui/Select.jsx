import { forwardRef } from 'react'
import clsx from 'clsx'

export const Select = forwardRef(
    (
        {
            label,
            name,
            error,
            options = [],
            className = '',
            containerClassName = '',
            placeholder,
            children,
            ...props
        },
        ref
    ) => {
        const errorMessage = typeof error === 'string' ? error : error?.message

        return (
            <div className={clsx('w-full', containerClassName)}>
                {label && (
                    <label
                        htmlFor={name}
                        className="block text-sm font-medium text-app-text mb-1.5"
                    >
                        {label}
                    </label>
                )}

                <div className="relative">
                    <select
                        ref={ref}
                        id={name}
                        name={name}
                        className={clsx(
                            'w-full px-3 py-2 rounded-lg border text-sm transition-all appearance-none cursor-pointer',
                            'bg-app-surface text-app-text',
                            'focus:outline-none focus:ring-2',
                            errorMessage
                                ? 'border-red-500 focus:ring-red-500/20 focus:border-red-500'
                                : 'border-app-border focus:ring-app-primary/20 focus:border-app-primary',
                            className
                        )}
                        {...props}
                    >
                        {placeholder && (
                            <option value="" disabled selected hidden>
                                {placeholder}
                            </option>
                        )}

                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}

                        {children}
                    </select>

                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-app-subtle">
                        <svg
                            className="h-4 w-4 fill-current"
                            viewBox="0 0 20 20"
                        >
                            <path
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                                fillRule="evenodd"
                            ></path>
                        </svg>
                    </div>
                </div>

                {errorMessage && (
                    <p className="text-red-500 text-xs mt-1.5">
                        {errorMessage}
                    </p>
                )}
            </div>
        )
    }
)

export default Select
