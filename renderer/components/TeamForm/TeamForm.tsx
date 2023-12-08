import { Button, Form, Input, Select, SelectProps } from 'antd';
import { FC } from 'react';

type FieldType = {
    name?: string;
    city?: string;
};

export interface ICity {
    region: string
    city: string
}

interface TeamFormProps {
    id?: string;
    name?: string;
    city?: string;
    cities: ICity[];
    onFinish: (values: any) => void;
    onFinishFailed: (values: any) => void;
}

export const TeamForm: FC<TeamFormProps> = (props) => {
    const {
        id,
        name,
        city,
        cities,
        onFinish,
        onFinishFailed
    } = props;

    const cityOptions = cities.map((city: ICity) => ({ value: city.city, label: city.city }));

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item<FieldType>
                label="Название команды"
                name="name"
                rules={[{ required: true, message: 'Введите название команды' }]}
            >
                <Input defaultValue={name} />
            </Form.Item>

            <Form.Item<FieldType>
                label="Населенный пункт"
                name="city"
                rules={[{ required: true, message: 'Выберете населенный пункт' }]}
            >
                <Select
                    showSearch
                    placeholder="Выберете населенный пункт"
                    options={cityOptions}
                    defaultValue={city}
                />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Сохранить
                </Button>
            </Form.Item>
        </Form>


    )
}