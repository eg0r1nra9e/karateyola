import { NextPage } from "next"
import { useRouter } from "next/router";


const CompetitionEdit: NextPage = () => {
    const router = useRouter();
    const { query } = router;

    return (
        <h1>
            Редактирование состязания с id {query?.id}
        </h1>
    )
}

export default CompetitionEdit;