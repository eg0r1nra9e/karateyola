import { NextPage } from "next"
import Link from "next/link";
import { useRouter } from "next/router";


const GameEdit: NextPage = () => {
  const router = useRouter();
  const { query } = router;

  return (
    <>
    <h1>
      Начать соревнование {query?.gameId}
      </h1>
      <Link href="/games/11/22">Начать состязание</Link>
    </>
  )
}

export default GameEdit;