import { ChangeEvent } from 'react'
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Input, { InputProps } from './Input' // Import InputProps ที่เราทำไว้ก่อนหน้า

// เรา extends InputProps เพื่อให้ SearchBar รับ props อื่นๆ ของ Input ได้ด้วย (เช่น disabled, autoFocus)
// แต่เรา Omit (ยกเว้น) value และ onChange เพื่อมากำหนดใหม่ให้เจาะจงขึ้น
interface SearchBarProps extends Omit<InputProps, 'value' | 'onChange'> {
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void

    // Props สำหรับ Filter Dropdown
    filterValue: string
    onFilterChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

const SearchBar = ({
    value,
    onChange,
    filterValue,
    onFilterChange,
    placeholder = 'Search...',
    className,
    ...props // props ที่เหลือจะถูกส่งไปที่ Input
}: SearchBarProps) => {
    return (
        <div className={clsx('flex items-center gap-2', className)}>
            {/* Search Input Section */}
            <div className="relative group flex-1">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-app-subtle group-focus-within:text-app-primary transition-colors z-10 pointer-events-none" />
                <Input
                    type="text"
                    name="search"
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="pl-10"
                    containerClassName="w-full"
                    autoFocus
                    {...props}
                />
            </div>

            {/* Filter Dropdown Section */}
            <div className="relative shrink-0">
                <FunnelIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-app-subtle pointer-events-none" />
                <select
                    value={filterValue}
                    onChange={onFilterChange}
                    className={clsx(
                        'pl-9 pr-8 py-2 rounded-lg border text-sm transition-all appearance-none cursor-pointer',
                        'bg-app-surface text-app-text',
                        'focus:outline-none focus:ring-2',
                        filterValue
                            ? 'border-app-primary ring-1 ring-app-primary/20'
                            : 'border-app-border hover:border-gray-400 dark:hover:border-gray-500'
                    )}
                >
                    <option value="">All Priorities</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>

                {/* Arrow Icon for Select */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-app-subtle">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        <path
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                            fillRule="evenodd"
                        ></path>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default SearchBar
