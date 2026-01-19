import { ReactNode } from 'react'

interface BoardLayoutProp {
    children: ReactNode
}

export default function BoardLayout({ children }: BoardLayoutProp) {
    return (
        <div className="w-full h-full overflow-hidden flex flex-col">
            <div className="flex-1 w-full h-full overflow-x-auto overflow-y-hidden scrollbar-thin">
                <div className="flex h-full gap-6 px-6 pb-6 pt-2 w-max items-start">
                    {children}
                </div>
            </div>
        </div>
    )
}
