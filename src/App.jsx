import AlertPopup from './components/AlartPopup/AlertPopup'
import Navbar from './components/Navbar'
import BoardPage from './pages/BoardPage'

function App() {
    return (
        <div className="min-h-screen bg-app-bg transition-colors duration-500">
            <Navbar />
            <AlertPopup />
            <main className="container mx-auto px-4 py-6">
                <BoardPage />
            </main>
        </div>
    )
}

export default App
