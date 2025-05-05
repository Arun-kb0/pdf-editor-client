import { useEffect, useState } from "react"
import PdfViewer from "../components/home/PdfViewer"
import Title from "../components/Title"
import { useLocation } from "react-router"
import { PdfFileDetailsType, PdfFileType } from "../constants/types"


const ContentsPage = () => {
  const location = useLocation()
  const [file, setFile] = useState<File | null>(null)
  const [pdfFileDetails, setPdfFileDetails] = useState<PdfFileDetailsType | undefined>()

  const bufferLikeToArrayBuffer = (buf: ArrayBuffer | { data: number[] }) => {
    if (buf instanceof ArrayBuffer) {
      return buf
    }
    return new Uint8Array(buf.data).buffer
  }

  const pdfToBrowserFile = (pdf: PdfFileType) => {
    const arrayBuffer = bufferLikeToArrayBuffer(pdf.file.data);
    const blob = new Blob([arrayBuffer], { type: pdf.file.contentType });
    return new File([blob], pdf.name, { type: pdf.file.contentType });
  }

  useEffect(() => {
    if (location.state.isDbStored) {
      const { file: newFile, ...rest } = location.state.file
      setPdfFileDetails(rest)
      const browserFile = pdfToBrowserFile(location.state.file)
      setFile(browserFile)
      return
    }
    setFile(location.state.file)
  }, [])

  return (
    <main>
      <Title title="Contents" />

      {file &&
        <PdfViewer
          file={file}
          pdfDetails={pdfFileDetails}
        />}

    </main>
  )
}

export default ContentsPage