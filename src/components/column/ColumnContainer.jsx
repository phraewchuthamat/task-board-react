import { forwardRef } from 'react'
import clsx from 'clsx'

const ColumnContainer = forwardRef(({ children, className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={clsx(
                'w-80 shrink-0',
                'flex flex-col',
                'max-h-full',
                'rounded-xl bg-app-surface border border-app-border shadow-sm transition-shadow hover:shadow-md',
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
})

export default ColumnContainer
