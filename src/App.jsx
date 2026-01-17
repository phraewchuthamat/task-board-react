import AlertPopup from './components/AlertPopup/AlertPopup'
import Board from './components/board/Board'
import Navbar from './components/Navbar'

function App() {
    return (
        // 1. h-screen: ความสูงเท่าหน้าจอเป๊ะ
        // 2. overflow-hidden: ห้าม Scroll ที่ตัว Body หลัก
        <div className="h-screen flex flex-col bg-app-bg transition-colors duration-500 overflow-hidden">
            <Navbar />
            <AlertPopup />

            {/* 3. ส่วน Main ยืดเต็มพื้นที่ (flex-1) และตัด container ออก */}
            <main className="flex-1 w-full relative overflow-hidden">
                <Board />
            </main>
        </div>
    )
}

export default App
