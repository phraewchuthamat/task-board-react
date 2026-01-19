import AlertPopup from './components/AlertPopup/AlertPopup'
import KanbanBoard from './components/board/KanbanBoard'
import Navbar from './components/Navbar'

function App() {
    return (
        <div className="h-screen flex flex-col bg-app-bg transition-colors duration-500 overflow-hidden">
            <Navbar />
            <AlertPopup />

            <main className="flex-1 w-full relative overflow-hidden">
                <KanbanBoard />
            </main>
        </div>
    )
}

export default App
