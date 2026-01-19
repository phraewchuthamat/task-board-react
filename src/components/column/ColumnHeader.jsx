import { memo } from 'react'
import clsx from 'clsx'
import ColumnMenu from './ColumnMenu'

function ColumnHeader({ title, count, color, onEditClick, onDeleteClick }) {
    return (
        <div className="p-2 pb-2 mb-2 border-b border-app-border">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className={clsx('w-3 h-3 rounded-full', color)} />
                    <h2 className="font-semibold text-app-text">{title}</h2>
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

                <ColumnMenu onEdit={onEditClick} onDelete={onDeleteClick} />
            </div>
        </div>
    )
}

export default memo(ColumnHeader)
