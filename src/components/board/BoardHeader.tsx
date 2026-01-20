import { memo, SetStateAction, Dispatch } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import Button from '../ui/Button'
import RefreshButton from '../ui/RefreshButton'
import SearchBar from '../ui/SearchBar'
import { Priority } from '../../utils/storage'
import { useLanguage } from '../../contexts/LanguageContext'

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
    const { trans } = useLanguage()

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4">
            <div>
                <h1 className="text-2xl font-bold text-app-text">
                    {trans('app_title')}
                </h1>
                <p className="text-xs text-app-subtle mt-1">
                    {trans('app_sub')}
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
                    placeholder={trans('placeholder_search')}
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
                    <span className="hidden sm:inline">
                        {trans('btn_new_task')}
                    </span>
                </Button>
            </div>
        </div>
    )
}

export default memo(BoardHeader)
