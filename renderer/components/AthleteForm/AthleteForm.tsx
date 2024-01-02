import React, { FC } from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import type { FormItemProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';


type FieldType = {
    firstName?: string;
    lastName?: string;
    date?: string;
    teamId?: string;
};

interface IAthleteFormProps {
    id?: string;
    firstName?: string;
    lastName?: string;
    date?: string;
    teamId?: string;
    onFinish: (values: any) => void;
    onFinishFailed: (values: any) => void;
}

export const AthleteForm: FC<IAthleteFormProps> = (props) => {
    const {
        id,
        firstName,
        lastName,
        date,
        teamId,
        onFinish,
        onFinishFailed
    } = props;

    const onFinish1 = (values: any) => {
        debugger
        console.log('Success:', values);
    };


    return (
        <>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off">

                <Form.Item<FieldType>
                    label="Имя"
                    name="firstName"
                    rules={[{ required: true, message: 'Введите имя' }]}
                >
                    <Input defaultValue={firstName}/>
                </Form.Item>
                <Form.Item<FieldType>
                    label="Фамилия"
                    name="lastName"
                    rules={[{ required: true, message: 'Введите фамилию' }]}
                >
                    <Input defaultValue={lastName}/>
                </Form.Item>
                <Form.Item<FieldType>
                    label="Дата рождения"
                    name="date"
                    rules={[{ required: true, message: 'Введите дату рождения' }]}>
                    <DatePicker />
                </Form.Item>
                <Form.Item<FieldType>
                    label="Название комады"
                    name="teamId"
                >
                    <Input defaultValue={teamId}/>


                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}
