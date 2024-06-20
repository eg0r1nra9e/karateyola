import { Button } from 'antd'
import { Popconfirm } from 'antd/lib'
import { FC, useState } from 'react'

import { DeleteOutlined } from '@ant-design/icons'

interface IDeleteButtonProps {
  title: string
  description: string
  onClick: () => void
}

export const DeleteButton: FC<IDeleteButtonProps> = (props) => {
  const { title, description, onClick } = props

  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)

  const showPopconfirm = () => {
    setOpen(true)
  }

  const handleOk = async () => {
    setConfirmLoading(true)

    await onClick()

    setConfirmLoading(false)
  }

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
  }

  return (
    <Popconfirm
      title={title}
      description={description}
      okText="Удалить"
      cancelText="Отменить"
      open={open}
      onConfirm={handleOk}
      okButtonProps={{ loading: confirmLoading }}
      onCancel={handleCancel}
    >
      <Button type="primary" danger onClick={showPopconfirm} icon={<DeleteOutlined />}>
        Удалить
      </Button>
    </Popconfirm>
  )
}
