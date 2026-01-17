import { CalendarIcon } from '@heroicons/react/24/outline'
import { formatDate, priorityColors } from '../../utils/formatters'
import clsx from 'clsx'

export default function TaskCardMeta({ task }) {
    return (
        <>
            {task.createdAt && (
                <div className="flex items-center gap-1 text-[11px] text-app-subtle opacity-70 mb-3">
                    <CalendarIcon className="w-3 h-3" />
                    {formatDate(task.createdAt)}
                </div>
            )}

            <span
                className={clsx(
                    'text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider',
                    priorityColors[task.priority] || priorityColors.low
                )}
            >
                {task.priority}
            </span>
        </>
    )
}
