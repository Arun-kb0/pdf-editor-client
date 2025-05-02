import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import ContentsPage from "./pages/ContentsPage"
import UploadPage from "./pages/UploadPage"
import NavigationBar from "./components/basic/NavigationBar"


const App = () => {
  return (
    <main className="bg-black h-screen">

      <NavigationBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/contents" element={<ContentsPage />} />
      </Routes>

    </main>
  )
}

export default App