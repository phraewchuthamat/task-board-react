import AlertPopup from './components/AlertPopup/AlertPopup'
import KanbanBoard from './components/board/KanbanBoard'
import Navbar from './components/Navbar'

function App() {
    return (
        <div className="h-screen w-screen flex flex-col bg-app-bg text-app-text font-sans overflow-hidden">
            <header className="flex-none z-40 bg-app-surface border-b border-app-border shadow-sm h-16 relative">
                <Navbar />
            </header>

            <AlertPopup />

            <main className="flex-1 w-full relative min-h-0">
                <KanbanBoard />
            </main>
        </div>
    )
}

export default App
