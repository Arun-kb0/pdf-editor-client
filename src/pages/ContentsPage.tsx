import { useEffect, useState } from "react"
import PdfViewer from "../components/home/PdfViewer"
import Title from "../components/Title"
import { useLocation } from "react-router"


const ContentsPage = () => {
  const location = useLocation()
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
   setFile(location.state.file)
  },[])

  return (
    <main>
      <Title title="Contents" />

      {file && <PdfViewer file={file} />}

    </main>
  )
}

export default ContentsPage