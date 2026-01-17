import { memo } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import Button from '../ui/Button'

function BoardHeader({ onNew }) {
    return (
        <>
            <div className="flex items-center justify-between p-4">
                <div>
                    <h1 className="text-2xl font-bold text-app-text">
                        Kanban Board
                    </h1>
                    <p className="text-xs text-app-subtle mt-1">
                        Manage your team tasks
                    </p>
                </div>

                <Button variant="primary" size="md" onClick={onNew}>
                    <PlusIcon className="w-5 h-5 mr-1.5" />
                    New Task
                </Button>
            </div>
        </>
    )
}

export default memo(BoardHeader)
