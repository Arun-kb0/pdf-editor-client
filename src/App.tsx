import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import ContentsPage from "./pages/ContentsPage"
import UploadPage from "./pages/UploadPage"
import NavigationBar from "./components/basic/NavigationBar"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <main className="bg-black min-h-screen min-w-screen">
      <ToastContainer theme="dark"/>
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