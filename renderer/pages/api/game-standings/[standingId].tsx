import log from 'electron-log'
import { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'

import { StandingWithDuel } from '../../../types/StandingWithDuel'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const standingId = Number(req.query.standingId)
  const standing = req.body as StandingWithDuel

  try {
    switch (req.method) {
      case 'PUT':
        await prisma.$transaction([
          prisma.standing.update({
            where: { id: Number(standingId) },
            data: {
              close: true,
            },
          }),
          prisma.standing.create({
            data: {
              gameCategoryId: standing.gameCategoryId,
              duels: {
                create: standing.duels.map((duel) => ({
                  firstPlayerId: duel.firstPlayerId,
                  secondPlayerId: duel.secondPlayerId,
                })),
              },
            },
          }),
        ])

        res.status(200).json(standing)
        break
      default:
        res.setHeader('Allow', ['PUT'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.error(error)
    log.error(error)
    res.status(400).json({ message: error })
  }
}
