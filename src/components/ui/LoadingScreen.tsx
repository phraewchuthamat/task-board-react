import { ArrowPathIcon } from '@heroicons/react/24/outline'

export default function LoadingScreen({ text = 'Loading...' }) {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] gap-4">
            <ArrowPathIcon className="w-10 h-10 animate-spin text-app-primary" />
            <p className="text-app-subtle animate-pulse font-medium">{text}</p>
        </div>
    )
}
