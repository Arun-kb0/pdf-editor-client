import { Route, Router, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import UploadPage from "./pages/uploadPage"
import ContentsPage from "./pages/ContentsPage"

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