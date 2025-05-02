import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

type FormValues = {
  fileList: FileList;
};

const FileUploader = () => {
  const navigation = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const handleFormSubmit = (data: FormValues) => {
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
                <svg
                  className="w-8 h-8 mb-4 text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-100">
                  <span className="font-semibold">Click to select</span> or drag and
                  drop
                </p>
                <p className="text-xs text-gray-100">PDF only</p>
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
