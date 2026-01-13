import Board from './components/Board'
import Navbar from './components/Navbar'
import AlertPopup from './components/ui/AlertPopup'

function App() {
    return (
        <div>
            <Navbar />
            <AlertPopup />
            <main>
                <Board />
            </main>
        </div>
    )
}

export default App
