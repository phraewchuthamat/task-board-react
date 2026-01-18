import { memo } from 'react'
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import Button from '../ui/Button'
import RefreshButton from '../ui/RefreshButton'

function BoardHeader({ onNew, searchQuery, setSearchQuery }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4">
            <div>
                <h1 className="text-2xl font-bold text-app-text">
                    Kanban Board
                </h1>
                <p className="text-xs text-app-subtle mt-1">
                    Manage your team tasks
                </p>
            </div>

            <div className="flex items-center gap-3">
                {/* --- Search Input Box --- */}
                <div className="relative group">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-app-subtle group-focus-within:text-app-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 pr-4 py-2 w-full sm:w-64 bg-app-surface border border-app-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-app-primary/50 transition-all shadow-sm"
                    />
                </div>

                <div className="h-8 w-[1px] bg-app-border mx-1 hidden sm:block"></div>

                <RefreshButton />

                <Button
                    variant="primary"
                    size="md"
                    onClick={onNew}
                    title="Create New Task"
                >
                    <PlusIcon className="w-5 h-5 sm:mr-1.5" />
                    <span className="hidden sm:inline">New Task</span>
                </Button>
            </div>
        </div>
    )
}

export default memo(BoardHeader)
