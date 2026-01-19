import { useTasks } from '../../contexts/TaskContext'
import Button from './Button'
import { ArrowPathIcon } from '@heroicons/react/24/outline'

const RefreshButton = () => {
    const { refetchTask, isLoading } = useTasks()

    return (
        <Button
            variant="outline"
            size="md"
            onClick={refetchTask}
            disabled={isLoading}
            className={isLoading ? 'animate-spin' : ''}
            title="Refresh Board"
        >
            <ArrowPathIcon
                className={`w-5 h-5 sm:mr-1.5 ${isLoading ? 'animate-spin' : ''}`}
            />

            <span className="hidden sm:inline">
                {isLoading ? 'Refreshing...' : 'Refresh'}
            </span>
        </Button>
    )
}

export default RefreshButton
