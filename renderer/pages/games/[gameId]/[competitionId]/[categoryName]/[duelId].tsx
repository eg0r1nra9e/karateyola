import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Duel: NextPage = () => {
  const router = useRouter()
  const { query } = router

  return (
    <>
      <h1>
        Соревнование {query?.gameId}, дисциплина {query.competitionId}, категория {query.categoryName}, поединок{' '}
        {query.duelId}
      </h1>
    </>
  )
}

export default Duel
