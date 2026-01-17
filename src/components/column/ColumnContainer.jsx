import { forwardRef } from 'react'
import clsx from 'clsx'

const ColumnContainer = forwardRef(({ children, className, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className={clsx(
                'flex flex-col shrink-0',
                'w-full md:w-80',
                'rounded-xl bg-app-surface border border-app-border shadow-md',
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
})

ColumnContainer.displayName = 'ColumnContainer'

export default ColumnContainer
