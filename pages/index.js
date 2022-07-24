import CardList from "../components/CardList/CardList";
import { ServicesContext } from "../contexts/Services";
import { useContext, useEffect } from "react";

export default function Home() {
  const { Services } = useContext(ServicesContext)
  useEffect(() => {
    Services.getAllPublishedPapers()
  }, [])
  return (
    <div className="container m-auto w-full p-6">
      <CardList />
    </div>
  )
}

// export async function getStaticProps() {

// }
