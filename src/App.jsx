import AlertPopup from './components/AlertPopup/AlertPopup'
import Board from './components/board/Board'
import Navbar from './components/Navbar'

function App() {
    return (
        <div className="h-screen flex flex-col bg-app-bg transition-colors duration-500 overflow-hidden">
            <Navbar />
            <AlertPopup />

            <main className="flex-1 w-full relative overflow-hidden">
                <Board />
            </main>
        </div>
    )
}

export default App
