import { Button, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import Link from 'next/link'

import { MinusOutlined } from '@ant-design/icons'

import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { removeCompetition, selectCompetitions } from '../../store/slices/competitionsSlice'
import { ICompetition } from '../../types/ICompetition'

export const CompetitionsContainer = () => {
  const competitions = useAppSelector(selectCompetitions)
  const dispatch = useAppDispatch()

  const deleteCompetitions = (CompetitionsId: string) => {
    dispatch(removeCompetition(CompetitionsId))
  }

  const columns: ColumnsType<ICompetition> = [
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
      render: (_, competition) => <Link href={`/competitions/edit/${competition.id}`}>{competition.name}</Link>,
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: '',
      key: 'action',
      render: (_, competitions) => (
        <Button type="primary" danger onClick={() => deleteCompetitions(competitions.id)} icon={<MinusOutlined />}>
          Удалить
        </Button>
      ),
    },
  ]

  return <Table dataSource={competitions} columns={columns} />
}
