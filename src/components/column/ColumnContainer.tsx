import { forwardRef, ReactNode } from 'react'

interface ColumnContainerProps {
    children: ReactNode
}

const ColumnContainer = forwardRef<HTMLDivElement, ColumnContainerProps>(
    ({ children }, ref) => {
        return (
            <div
                ref={ref}
                className="flex flex-col w-80 shrink-0 max-h-full bg-app-surface/50 border border-app-border rounded-xl shadow-sm backdrop-blur-sm"
            >
                {children}
            </div>
        )
    }
)

export default ColumnContainer
