import { FC } from 'react';
import cities from '../../data/city.json'; 
import { TeamForm } from '../../components/TeamForm/TeamForm';


interface TeamFormProps {
    id?: string;
    name?: string;
    city?: string;
}


export const TeamFormContainer: FC<TeamFormProps> = (props) => {
    const {
        id,
        name,
        city,
    } = props;

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <TeamForm id={id} name={name} city={city} cities={cities} onFinish={onFinish} onFinishFailed={onFinishFailed} />
    )
}