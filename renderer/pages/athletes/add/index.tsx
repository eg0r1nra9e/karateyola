import { NextPage } from "next"
import { AthleteForm } from "../../../components/AthleteForm/AthleteForm";

const AthleteAdd: NextPage = () => {
    return (
        <>
            <h1>
            Добавление спортсмена
            </h1>
            <AthleteForm   />
        </>
    )
}

export default AthleteAdd;