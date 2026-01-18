import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Input from './Input'

const SearchBar = ({
    value,
    onChange,
    placeholder = 'Search...',
    className,
    ...props
}) => {
    return (
        <div className={clsx('relative group', className)}>
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
    )
}

export default SearchBar
