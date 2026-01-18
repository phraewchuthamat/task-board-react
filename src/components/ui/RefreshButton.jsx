import { useTask } from '../../hooks/useTask'
import Button from './Button'
import { ArrowPathIcon } from '@heroicons/react/24/outline'

const RefreshButton = () => {
    const { refetchTask, isLoading } = useTask()

    return (
        <Button
            variant="outline"
            size="md"
            onClick={refetchTask}
            disabled={isLoading}
            className={isLoading ? 'animate-spin' : ''}
        >
            <ArrowPathIcon className="w-5 h-5 mr-1.5" />
            {isLoading ? 'Refreshing...' : 'Refresh '}
        </Button>
    )
}

export default RefreshButton
