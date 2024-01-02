import { FC } from 'react';
import { AthleteForm } from '../../components/AthleteForm/AthleteForm';


interface IAthleteFormProps {
    id?: string;
    firstName?: string;
    lastName?: string;
    date?: string;
    teamId?: string;
}


export const AthleteFormContainer: FC<IAthleteFormProps> = (props) => {
    const {
        id,
        firstName,
        lastName,
        date,
        teamId,
    } = props;

    const onFinish = (values: any) => {
        debugger
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        debugger
        console.log('Failed:', errorInfo);
    };

    return (
        <AthleteForm 
        id={id} 
        firstName={firstName} 
        lastName={lastName} 
        teamId={teamId} 
        date={date} 
        onFinish={onFinish} 
        onFinishFailed={onFinishFailed} />
    )
}