import { Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import {
    BarsOutlined, HomeOutlined, TeamOutlined, TrophyOutlined, UserOutlined
} from '@ant-design/icons';

const menu = [
    {
        label: (
            <Link href="/">
                Главная
            </Link>
        ),
        key: '',
        icon: <HomeOutlined />,
    },
    {
        label: (
            <Link href="/teams">
                Команды
            </Link>
        ),
        key: 'teams',
        icon: <TeamOutlined />,
    },
    {
        label: (
            <Link href="/athletes">
                Спортсмены
            </Link>
        ),
        key: 'athletes',
        icon: <UserOutlined />,
    },
    {
        label: (
            <Link href="/competitions">
                Дисциплины
            </Link>
        ),
        key: 'competitions',
        icon: <BarsOutlined />,
    },
    {
        label: (
            <Link href="/games">
                Соревнования
            </Link>
        ),
        key: 'games',
        icon: <TrophyOutlined />,
    },
];

export const LeftMenu = () => {
    const router = useRouter();
    const [current, setCurrent] = useState(router.pathname);

    useEffect(() => {
        const pathArray = router.pathname.split("/");
        const key = pathArray[1];

        setCurrent(key)
    }, [router.pathname]);

    return (
        <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[current]}
            items={menu} />
    )
};