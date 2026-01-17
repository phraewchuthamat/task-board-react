export const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const priorityColors = {
    high: 'bg-rose-500/10 text-rose-500 border-rose-500/30',
    medium: 'bg-amber-500/10 text-amber-500 border-amber-500/30',
    low: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30',
}

export const STATUS_COLORS = {
    todo: 'bg-blue-500',
    doing: 'bg-yellow-500',
    done: 'bg-emerald-500',
}

export const DEFAULT_COLUMNS = [
    { title: 'To Do', status: 'todo' },
    { title: 'Doing', status: 'doing' },
    { title: 'Done', status: 'done' },
]

export const PRIORITY_OPTIONS = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
]
