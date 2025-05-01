import { Route, Router, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import ContentsPage from "./pages/ContentsPage"
import UploadPage from "./pages/UploadPage"

const App = () => {
  return (
    < >

      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/upload" element={<UploadPage/>} />
        <Route path="/contents" element={<ContentsPage/>} />
      </Routes>

    </>
  )
}

export default App