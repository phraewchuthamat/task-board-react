import Board from './components/Board'
import Navbar from './components/Navbar'
import AlertPopup from './components/ui/AlertPopup'

function App() {
    return (
        <div className="min-h-screen bg-app-bg transition-colors duration-500">
            <Navbar />
            <AlertPopup />
            <main className="container mx-auto px-4 py-6">
                <Board />
            </main>
        </div>
    )
}

export default App
