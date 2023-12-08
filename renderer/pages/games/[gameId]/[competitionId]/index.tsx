import { NextPage } from "next"
import Link from "next/link";
import { useRouter } from "next/router";


const Competition: NextPage = () => {
  const router = useRouter();
  const { query } = router;

  return (
    <>
      <h1>
        Соревнование {query?.gameId}, состязание {query.competitionId}
      </h1>
      < Link href="/games/11/22/33">Начать бой</Link>
    </>
  )
}

export default Competition;