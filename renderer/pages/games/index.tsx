import { NextPage } from "next"
import Link from "next/link";

const Games: NextPage = () => {
  return (
    <>
      <h1>
        Соревнования
      </h1>
      <Link href="/games/add">Добавить</Link>
      <Link href="/games/edit/1">Изменить</Link>
      <Link href="/games/start/1">Начать соревнование</Link>
    </>
  )
}

export default Games;