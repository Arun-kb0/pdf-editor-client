import { useLocation } from "react-router"

type Props = {
  title: string
}

const Title = ({ title }: Props) => {
  const location = useLocation()

  return (
    <section className=''>

      <div className="flex items-center justify-center py-4">
        <h1 className="capitalize text-white text-2xl md:text-3xl pl-2 my-2 border-l-4  font-sans font-bold border-teal-400  dark:text-gray-200">
          {title}
        </h1>
      </div>

      <div className="p-4" >
        <h4 className="font-thin text-gray-200 cursor-pointer" > {location.pathname === '/' ? '/Home' : location.pathname} </h4>
      </div>

    </section>
  )
}

export default Title