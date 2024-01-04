import { Button, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import Link from 'next/link'

import { MinusOutlined } from '@ant-design/icons'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { removeTeam, selectTeams } from '../../store/slices/teamsSlice'
import { ITeam } from '../../types/ITeam'

export const TeamsContainer = () => {
  const teams = useAppSelector(selectTeams)
  const dispatch = useAppDispatch()

  const deleteTeam = (teamId: string) => {
    dispatch(removeTeam(teamId))
  }

  const columns: ColumnsType<ITeam> = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      render: (_, team) => <Link href={`/teams/edit/${team.id}`}>{team.name}</Link>,
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Город',
      dataIndex: 'city',
      key: 'city',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: '',
      key: 'action',
      render: (_, team) => (
        <Button
          type="primary"
          danger
          onClick={() => deleteTeam(team.id)}
          icon={<MinusOutlined className="teamSocialIcon" />}
        >
          Удалить
        </Button>
      ),
    },
  ]

  return <Table dataSource={teams} columns={columns} />
}
