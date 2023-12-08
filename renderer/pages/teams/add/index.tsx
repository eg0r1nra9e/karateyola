import { NextPage } from "next"
import { TeamForm } from "../../../components/TeamForm/TeamForm";

const TeamAdd: NextPage = () => {
    return (
        <>
            <h1>
                Добавление команды
            </h1>
            <TeamForm />
        </>
    )
}

export default TeamAdd;