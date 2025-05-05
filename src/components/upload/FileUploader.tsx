import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { CloudArrowUpIcon } from '@heroicons/react/24/solid'
import { axiosInstance } from '../../config/axiosInstance'

type FormValues = {
  fileList: FileList;
};

const FileUploader = () => {
  const navigation = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>()
  const fileList = watch('fileList') as FileList | undefined;

  const handleFormSubmit = async (data: FormValues) => {
    const file = data.fileList?.[0]
    navigation('/contents', { state: { file } })
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <section className="flex flex-col items-center space-y-4">
        <div className="flex justify-center items-center">
          <div className="min-w-80">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-800 bg-gray-700 border-gray-600 hover:border-gray-500"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <CloudArrowUpIcon className="w-16 h-16 mb-4 text-gray-400" />
                {fileList
                  ? (
                    <p className="mb-2 text-sm text-gray-100 flex flex-col">
                      <span className="font-semibold">Selected file</span>
                      <span>{fileList.length > 0 ? fileList[0].name : ''}</span>
                    </p>
                  ) : (
                    <>
                      <p className="mb-2 text-sm text-gray-100">
                        <span className="font-semibold">Click to select</span> or drag and
                        drop
                      </p>
                      <p className="text-xs text-gray-100">PDF only</p>
                    </>
                  )
                }
              </div>
              <input
                id="dropzone-file"
                type="file"
                accept="application/pdf"
                className="hidden"
                {...register('fileList', {
                  required: 'Please upload a PDF file',
                  validate: fileList => fileList.length > 0 || 'File is required',
                })}
              />
            </label>
            {errors.fileList && (
              <p className="mt-2 text-sm text-red-500">
                {errors.fileList.message}
              </p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="capitalize px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 focus:outline-none"
        >
          view content
        </button>
      </section>
    </form>
  );
};

export default FileUploader;
