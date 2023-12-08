import { NextPage } from "next"
import { useRouter } from "next/router";


const GameEdit: NextPage = () => {
  const router = useRouter();
  const { query } = router;

  return (
    <h1>
      Редактирование соревнования с id {query?.id}
    </h1>
  )
}

export default GameEdit;