import { DocumentIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router'

type Props = {
  file: File | undefined
}

const PdfCard = ({ file }: Props) => {
  const navigation = useNavigate()

  const handleNavigation = () => {
    navigation('/contents', {
      state: { file }
    })
  }

  return (
    <button onClick={handleNavigation} className="cursor-pointer flex flex-col bg-gray-900 shadow-sm border border-slate-500 rounded-lg my-6 w-72">
      <div className="m-2.5 overflow-hidden rounded-md h-80 flex justify-center items-center">
        <DocumentIcon className='w-full h-full object-cover text-gray-200' />
      </div>
      <div className="p-6 text-center">
        <h4 className="mb-1 text-xl font-semibold text-white">
          file name
          {/* {file.name} */}
        </h4>
      </div>
    </button>
  )
}

export default PdfCard