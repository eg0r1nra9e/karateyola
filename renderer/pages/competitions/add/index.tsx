import { NextPage } from "next"
import { CompetitionForm } from "../../../components/CompetitionForm/CompetitionForm";

const CompetitionAdd: NextPage = () => {
    return (
        <>
            <h1>
                Добавление дисциплины
            </h1>
            <CompetitionForm />
        </>

    )
}

export default CompetitionAdd;