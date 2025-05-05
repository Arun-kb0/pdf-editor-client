import { useEffect, useState } from "react"
import Title from "../components/Title"
import PdfCard from "../components/home/PdfCard"
import { axiosInstance } from "../config/axiosInstance"
import { PdfFileType } from "../constants/types"

type Props = {}

const HomePage = (props: Props) => {
  const [pdfFiles, setPdfFiles] = useState<PdfFileType[]>([])

  useEffect(() => {
    (async () => {
      const res = await axiosInstance.get(`/?page=${1}`)
      setPdfFiles(res.data.pdfFiles)
    })()
  }, [])

  return (
    <main >
      <Title title="select saved pdf's" />

      <section className="flex justify-center flex-wrap gap-4">
        {pdfFiles.map((item) => (
          <PdfCard file={item} />
        ))}
      </section>

    </main>
  )
}

export default HomePage