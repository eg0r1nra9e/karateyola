import { NextPage } from 'next'
import Link from 'next/link'

const Team: NextPage = () => {
  return (
    <>
      <h1>Команды</h1>
      <Link href="/teams/add">Добавить</Link>
      <Link href="/teams/edit/etrewtwe">Изменить</Link>
      <div>Тут список команд в виде таблицы</div>
    </>
  )
}

export default Team
