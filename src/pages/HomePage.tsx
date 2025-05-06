import { useEffect } from "react"
import Title from "../components/Title"
import PdfCard from "../components/home/PdfCard"
import { axiosInstance } from "../config/axiosInstance"
import { usePdfFiles } from "../context/PdfFilesContext"
import { Button } from "@material-tailwind/react"


const HomePage = () => {
  const { state: { currentPage, numberOfPages, pdfFiles }, dispatch } = usePdfFiles()

  useEffect(() => {
    if (currentPage !== 1) return
    (async () => {
      const res = await axiosInstance.get(`/?page=${currentPage}`)
      dispatch({ type: "SET", payload: res.data })
    })()
  }, [])

  const loadMore = async () => {
    if (currentPage > numberOfPages) return
    const res = await axiosInstance.get(`/?page=${currentPage + 1}`)
    dispatch({ type: "SET", payload: res.data })
  }

  return (
    <main >
      <Title title="select saved pdf's" />

      <section className="flex justify-center flex-wrap gap-4">
        {pdfFiles.map((item) => (
          <PdfCard
            key={item._id}
            file={item}
          />
        ))}
      </section>

      <div className="flex justify-center items-center">
        {
          <Button
            onClick={loadMore}
            disabled={currentPage > numberOfPages}
          >
            Load more
          </Button>
        }
      </div>

    </main>
  )
}

export default HomePage