import { NextPage } from "next"
import Link from "next/link";
import { useRouter } from "next/router";


const Duel: NextPage = () => {
  const router = useRouter();
  const { query } = router;

  return (
    <>
      <h1>
        Соревнование {query?.gameId}, состязание {query.competitionId}, поединок {query.duelId}
      </h1>
    </>
  )
}

export default Duel;