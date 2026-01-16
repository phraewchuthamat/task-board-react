import AlertPopup from './components/AlartPopup/AlertPopup'
import Board from './components/board/Board'
import Navbar from './components/Navbar'

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
