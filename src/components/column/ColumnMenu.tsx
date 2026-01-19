import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {
    EllipsisHorizontalIcon,
    PencilSquareIcon,
    TrashIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'

interface ColumnMenuProps {
    onEdit?: () => void
    onDelete?: () => void
}

export default function ColumnMenu({ onEdit, onDelete }: ColumnMenuProps) {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-app-bg text-app-subtle hover:text-app-text transition-colors focus:outline-none focus:ring-2 focus:ring-app-primary/50">
                    <EllipsisHorizontalIcon
                        className="w-5 h-5"
                        aria-hidden="true"
                    />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 z-50 mt-1 w-48 origin-top-right divide-y divide-gray-700 rounded bg-app-surface ring-1 ring-gary-700 ring-opacity-5 focus:outline-none border border-app-border">
                    <div className="p-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={onEdit}
                                    className={clsx(
                                        'group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors',
                                        active
                                            ? 'bg-app-primary text-white'
                                            : 'text-app-text'
                                    )}
                                >
                                    <PencilSquareIcon
                                        className={clsx(
                                            'mr-2 h-4 w-4',
                                            active
                                                ? 'text-white'
                                                : 'text-app-primary'
                                        )}
                                        aria-hidden="true"
                                    />
                                    Edit Column
                                </button>
                            )}
                        </Menu.Item>
                    </div>

                    <div className="p-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={onDelete}
                                    className={clsx(
                                        'group flex w-full items-center rounded-md px-2 py-2 text-sm transition-colors',
                                        active
                                            ? 'bg-red-500 text-white'
                                            : 'text-red-500'
                                    )}
                                >
                                    <TrashIcon
                                        className={clsx(
                                            'mr-2 h-4 w-4',
                                            active
                                                ? 'text-white'
                                                : 'text-red-500'
                                        )}
                                        aria-hidden="true"
                                    />
                                    Delete Column
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
