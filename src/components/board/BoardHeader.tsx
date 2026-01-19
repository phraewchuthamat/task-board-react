import { memo, SetStateAction, Dispatch } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import Button from '../ui/Button'
import RefreshButton from '../ui/RefreshButton'
import SearchBar from '../ui/SearchBar'
import { Priority } from '../../utils/storage'

interface BoardHeaderProps {
    onNew: () => void
    searchQuery: string
    setSearchQuery: Dispatch<SetStateAction<string>>
    filterPriority: Priority | ''
    setFilterPriority: Dispatch<SetStateAction<Priority | ''>>
}

function BoardHeader({
    onNew,
    searchQuery,
    setSearchQuery,
    filterPriority,
    setFilterPriority,
}: BoardHeaderProps) {
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
                <SearchBar
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    filterValue={filterPriority}
                    onFilterChange={(e) =>
                        setFilterPriority(e.target.value as Priority | '')
                    }
                    placeholder="Search tasks..."
                    className="w-full sm:w-auto"
                />

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
