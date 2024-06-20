import log from 'electron-log'
import { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'
import { GameWithAll } from '../../../types/GameWithAll'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const gameId = +req.query.id
  const { name, startDate, endDate, status } = req.body as GameWithAll

  let game

  try {
    switch (req.method) {
      case 'GET':
        game = await prisma.game.findUnique({
          where: {
            id: gameId,
          },
        })
        res.status(200).json(game)
        break

      case 'PUT':
        game = await prisma.game.update({
          where: { id: Number(gameId) },
          data: {
            name,
            startDate,
            endDate,
            status,
          },
        })
        res.status(200).json(game)
        break

      case 'DELETE':
        await prisma.game.deleteMany({
          where: { id: Number(gameId) },
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
