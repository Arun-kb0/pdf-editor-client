import Title from "../components/Title"
import PdfCard from "../components/home/PdfCard"

type Props = {}

const HomePage = (props: Props) => {
  return (
    <main >
      <Title title="select saved pdf's" />

      <section className="flex justify-center flex-wrap gap-4">
        {Array.from({ length: 5 }, (_, index) => (
          <PdfCard file={undefined} />
        ))}
      </section>

    </main>
  )
}

export default HomePage