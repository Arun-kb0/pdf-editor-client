import { DocumentIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router'
import { PdfFileType } from '../../constants/types'
import { Button, IconButton } from '@material-tailwind/react'
import { usePdfFiles } from '../../context/PdfFilesContext'
import { axiosInstance } from '../../config/axiosInstance'
import { toast } from 'react-toastify'

type Props = {
  file: PdfFileType
}

const PdfCard = ({ file }: Props) => {
  const navigation = useNavigate()
  const { dispatch } = usePdfFiles()

  const handleNavigation = () => {
    navigation('/contents', {
      state: { file, isDbStored: true }
    })
  }

  const handleDelete = async () => {
    await axiosInstance.delete(`/${file._id}`)
    dispatch({ type: 'DELETE', payload: { pdfFileId: file._id } })
    toast('File deleted')
  }

  return (
    <section className="cursor-pointer flex flex-col bg-gray-900 shadow-sm border border-slate-500 rounded-lg my-6 w-72">
      <IconButton onClick={handleNavigation} className="m-2.5 overflow-hidden rounded-md h-80 flex justify-center items-center">
        <DocumentIcon className='w-full h-full object-cover text-gray-200' />
      </IconButton>
      <div className="p-6 space-y-2">
        <h4 className="mb-1 text-xl font-semibold text-white text-center">
          {file.name}
        </h4>
        <div className='flex justify-center items-center'>
          <Button color='error' onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    </section>
  )
}

export default PdfCard