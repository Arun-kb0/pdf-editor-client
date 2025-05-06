import { PDFDocument } from 'pdf-lib'
import { Document, Page, pdfjs } from 'react-pdf'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, IconButton } from '@material-tailwind/react'
import { toast } from 'react-toastify'
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/solid'
import { axiosInstance } from '../../config/axiosInstance'
import { PdfFileDetailsType } from '../../constants/types'
import { usePdfFiles } from '../../context/PdfFilesContext'

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.js`

type Props = {
  file: File
  pdfDetails: PdfFileDetailsType | undefined
}

const PdfViewer = ({ file, pdfDetails }: Props) => {
  const [pdfDoc, setPdfDoc] = useState<PDFDocument | null>(null)
  const [pdfBytes, setPdfBytes] = useState<Uint8Array | null>(null)
  const [numPages, setNumPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [_, setPageWidth] = useState(window.innerWidth)
  const { state, dispatch } = usePdfFiles()

  useEffect(() => {
    const handleResize = () => {
      setPageWidth(window.innerWidth < 786 ? 300 : 600)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [window.innerWidth])

  useEffect(() => {
    let cancelled = false
    console.log('useEffect Loading PDF file:', file.name)

    const load = async () => {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        if (!(uint8Array[0] === 0x25 && uint8Array[1] === 0x50 && uint8Array[2] === 0x44 && uint8Array[3] === 0x46)) { // Check for %PDF
          throw new Error('No PDF header found. File may not be a valid PDF.');
        }
        if (
          uint8Array.length < 4 ||
          uint8Array[0] !== 0x25 ||
          uint8Array[1] !== 0x50 ||
          uint8Array[2] !== 0x44 ||
          uint8Array[3] !== 0x46
        ) {
          throw new Error('No PDF header found.');
        }

        const loadedDoc = await PDFDocument.load(arrayBuffer);
        const savedBytes = await loadedDoc.save();

        if (cancelled) return
        setPdfDoc(loadedDoc);
        setPdfBytes(savedBytes);
        setNumPages(loadedDoc.getPageCount());
        setCurrentPage(1);
      } catch (err) {
        console.error('PDF load error:', err)
        toast.error('Error loading PDF file. Please try again.')
      }
    }

    load()
    return () => { cancelled = true }
  }, [file])

  const handleRemove = useCallback(async () => {
    if (!pdfDoc) return
    if (numPages === 0) {
      toast('No page to remove')
      return
    }
    const idx = currentPage - 1
    if (idx < 0 || idx >= pdfDoc.getPageCount()) return
    setLoading(true)
    try {
      pdfDoc.removePage(idx)
      const newBytes = await pdfDoc.save()
      setPdfBytes(newBytes)
      const updatedCount = pdfDoc.getPageCount()
      setNumPages(updatedCount)
      setCurrentPage(prev => (prev > updatedCount ? updatedCount : prev))
    } catch (error) {
      setLoading(false)
      console.error('Error removing page:', error)
    }
  }, [pdfDoc, currentPage])

  const docFile = useMemo(() => {
    return pdfBytes ? { data: pdfBytes } : undefined;
  }, [pdfBytes]);


  const goPrev = () => { setCurrentPage(prev => Math.max(1, prev - 1)) }
  const goNext = () => { setCurrentPage(prev => Math.min(numPages, prev + 1)) }

  const handleSave = useCallback(async () => {
    try {
      if (!pdfDoc) {
        console.log('No pdfDoc data to upload.')
        return
      }
      const formData = new FormData()
      const updatedBytes = await pdfDoc.save()
      const blob = new Blob([updatedBytes], { type: 'application/pdf' })
      formData.append('pdf', blob, file.name)
      if (pdfDetails) {
        console.log('update pdf file call')
        const res = await axiosInstance.patch(`/${pdfDetails._id}`, formData, {})
        dispatch({
          type: 'UPDATE',
          payload: {
            pdfFile: res.data.updatedFile,
            pdfFileId: res.data.updatedFile._id
          }
        })
        console.log(res)
        return
      }
      const res = await axiosInstance.post('/', formData, {})
      dispatch({ type: 'ADD', payload: res.data.newPdfFile })
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }, [pdfBytes, file, axiosInstance])

  return (
    <section className='flex flex-col items-center space-y-4'>
      {loading && <p>Loading PDF...</p>}
      {currentPage < 1 && <p>No page to show</p>}
      {docFile
        ? (
          <Document
            file={docFile}
            onLoadSuccess={data => setNumPages(data.numPages)}
            onLoadError={err => console.error('PDF.js load error:', err)}
            onSourceError={err => console.error('PDF.js load error:', err)}
            loading="Loading PDF..."
            className='border shadow'
          >
            <Page
              pageNumber={currentPage}
              width={window.innerWidth < 768 ? 300 : 600}
            />
          </Document>
        )
        : (
          <p>Preparing PDF...</p>
        )
      }

      <div className=''>
        <div className='flex justify-center items-center sm:space-x-2 space-x-1 text-white py-2'>
          <IconButton
            onClick={goPrev}
            disabled={currentPage <= 1}
          >
            <ChevronLeftIcon className='h-6 w-6' />
          </IconButton>

          <span>Page {`${currentPage} / ${numPages}`} </span>

          <IconButton
            onClick={goNext}
            disabled={currentPage >= numPages}
          >
            <ChevronRightIcon className='h-6 w-6' />
          </IconButton>
        </div>

        <div className='flex justify-center items-center sm:space-x-2 space-x-1 text-white py-2'>
          <Button
            onClick={handleRemove}
            disabled={!pdfDoc || numPages === 0}
            className='bg-red-600 hover:bg-red-500'
          >
            Delete page {currentPage}
          </Button>

          <Button
            onClick={handleSave}
            disabled={!pdfDoc || numPages === 0}
            className='bg-green-600 hover:bg-green-500'
          >
            save
          </Button>
        </div>

      </div>
    </section>
  )
}

export default PdfViewer