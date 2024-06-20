import log from 'electron-log'
import { NextApiRequest, NextApiResponse } from 'next'

import { Category, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const categoryId = +req.query.id
  const { name, time } = req.body as Category

  let category

  try {
    switch (req.method) {
      case 'GET':
        category = await prisma.category.findUnique({
          where: {
            id: categoryId,
          },
        })
        res.status(200).json(category)
        break

      case 'PUT':
        category = await prisma.category.update({
          where: { id: Number(categoryId) },
          data: {
            name,
            time: Number(time),
          },
        })
        res.status(200).json(category)
        break

      case 'DELETE':
        category = await prisma.category.delete({
          where: { id: Number(categoryId) },
        })
        res.status(200).json({ message: 'Note updated' })
        break

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.error(error)
    log.error(error)
    res.status(400).json({ message: error })
  }
}
