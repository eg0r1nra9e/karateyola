import { NextPage } from "next"
import { useRouter } from "next/router";


const TeamEdit: NextPage = () => {
    const router = useRouter();
    const { query } = router;

    return (
        <h1>
            Редактирование команды с id {query?.id}
        </h1>
    )
}

export default TeamEdit;