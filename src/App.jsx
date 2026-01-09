import Dashboard from './components/Dashboard'
import Navbar from './components/Navbar'
import AlertPopup from './components/ui/AlertPopup'

function App() {
    return (
        <div>
            <Navbar />
            <AlertPopup />
            <main>
                <Dashboard />
            </main>
        </div>
    )
}

export default App
