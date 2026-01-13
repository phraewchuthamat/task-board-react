import { PlusIcon } from '@heroicons/react/24/outline'

export default function BoardHeader({ onNew }) {
    const today = new Date().toLocaleDateString('th-TH', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    })

    return (
        <div className="container mx-auto px-6 pt-8 pb-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-app-text flex items-baseline gap-3">
                    Todo Today
                    <span className="text-lg font-medium text-app-subtle">
                        {today}
                    </span>
                </h1>

                <button
                    onClick={onNew}
                    className="flex items-center gap-2 px-4 py-2 
                     bg-app-accent hover:bg-cyan-600 
                     text-white font-semibold text-sm rounded-lg 
                     shadow-md hover:shadow-lg
                     transition-all"
                >
                    <PlusIcon className="h-5 w-5" />
                    New Task
                </button>
            </div>
        </div>
    )
}
