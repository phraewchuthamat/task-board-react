import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {
    EllipsisHorizontalIcon,
    MagnifyingGlassIcon,
    PencilSquareIcon,
    TrashIcon,
} from '@heroicons/react/24/outline'

export default function ColumnMenu({ onEdit, onDelete, onToggleSearch }) {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-app-bg text-app-subtle transition-colors">
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
                <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="px-1 py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={onToggleSearch}
                                    className={`${
                                        active
                                            ? 'bg-app-primary text-white'
                                            : 'text-app-text'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    <MagnifyingGlassIcon
                                        className="mr-2 h-4 w-4"
                                        aria-hidden="true"
                                    />
                                    Search Tasks
                                </button>
                            )}
                        </Menu.Item>
                    </div>

                    <div className="px-1 py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={onEdit}
                                    className={`${
                                        active
                                            ? 'bg-app-primary text-white'
                                            : 'text-app-text'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    <PencilSquareIcon
                                        className="mr-2 h-4 w-4"
                                        aria-hidden="true"
                                    />
                                    Edit Column
                                </button>
                            )}
                        </Menu.Item>
                    </div>

                    <div className="px-1 py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={onDelete}
                                    className={`${
                                        active
                                            ? 'bg-red-500 text-white'
                                            : 'text-red-500'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                    <TrashIcon
                                        className="mr-2 h-4 w-4"
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
