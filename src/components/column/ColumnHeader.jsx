import { memo } from 'react'
import clsx from 'clsx'

function ColumnHeader({ title, status, count }) {
    const statusColors = {
        todo: 'bg-blue-500',
        doing: 'bg-yellow-500',
        done: 'bg-emerald-500',
    }

    return (
        <div className="p-4 border-b border-app-border">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span
                        className={clsx(
                            'w-3 h-3 rounded-full',
                            statusColors[status]
                        )}
                    />
                    <h2 className="font-semibold text-app-text">{title}</h2>
                </div>

                <span
                    className="flex items-center justify-center
                        min-w-[24px] h-6 px-1.5
                        bg-gray-200 dark:bg-gray-700
                        rounded-full 
                        text-xs font-bold
                        text-app-subtle"
                >
                    {count}
                </span>
            </div>
        </div>
    )
}

export default memo(ColumnHeader)
