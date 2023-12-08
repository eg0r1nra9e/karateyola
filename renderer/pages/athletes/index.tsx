import { NextPage } from 'next';
import Link from 'next/link';

export const Athletes: NextPage = () => {
  return (
    <>
      <h1>
        Спортсмены
      </h1>
      <Link href="/athletes/add">Добавить</Link>
      <Link href="/athletes/edit/1">Изменить</Link>
    </>
  )
}

export default Athletes;