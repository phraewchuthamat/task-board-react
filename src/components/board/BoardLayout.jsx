export default function BoardLayout({ children }) {
    return (
        <div className="flex flex-row h-full overflow-x-auto overflow-y-hidden gap-6 p-4">
            {children}

            <div className="w-4 shrink-0" />
        </div>
    )
}
