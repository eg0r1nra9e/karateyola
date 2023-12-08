import { NextPage } from "next"
import Link from "next/link";

const Competitions: NextPage = () => {
  return (

    <>
      <h1>
        Виды состязаний
      </h1>
      <Link href="/competitions/add">Добавить</Link>
      <Link href="/competitions/edit/1">Изменить</Link>
    </>
  )
}

export default Competitions;