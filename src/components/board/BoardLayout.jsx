export default function BoardLayout({ children }) {
    return (
        <div className="flex flex-col md:flex-row gap-6 p-4 h-auto md:h-full min-w-full">
            {children}
        </div>
    )
}
