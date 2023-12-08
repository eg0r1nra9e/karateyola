import { NextPage } from "next"
import Link from "next/link";

const Team: NextPage = () => {
    return (
        <>
        <h1>
            Команды
        </h1>
            <Link href="/teams/add">Добавить</Link>
            <Link href="/teams/edit/1">Изменить</Link>
        </>
    )
}

export default Team;