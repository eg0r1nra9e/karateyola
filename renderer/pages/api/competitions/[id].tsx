import log from 'electron-log'
import { NextApiRequest, NextApiResponse } from 'next'

import { Competition, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const competitionId = +req.query.id
  const { name } = req.body as Competition

  let competition

  try {
    switch (req.method) {
      case 'GET':
        competition = await prisma.competition.findUnique({
          where: {
            id: competitionId,
          },
        })
        res.status(200).json(competition)
        break

      case 'PUT':
        competition = await prisma.competition.update({
          where: { id: Number(competitionId) },
          data: {
            name,
          },
        })
        res.status(200).json(competition)
        break

      case 'DELETE':
        competition = await prisma.competition.delete({
          where: { id: Number(competitionId) },
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
