import log from 'electron-log'
import { NextApiRequest, NextApiResponse } from 'next'

import { Duel, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const duelId = Number(req.query.duelId)
  const currentDuel = req.body as Duel

  let duel
  try {
    switch (req.method) {
      case 'GET':
        duel = await prisma.duel.findUnique({
          where: { id: duelId },
          include: {
            firstPlayer: {
              include: {
                team: {
                  include: {
                    city: true,
                  },
                },
              },
            },
            secondPlayer: {
              include: {
                team: {
                  include: {
                    city: true,
                  },
                },
              },
            },
            standing: {
              include: {
                gameCategory: {
                  include: {
                    category: true,
                    gameCompetition: {
                      include: {
                        competition: true,
                        game: true,
                      },
                    },
                  },
                },
              },
            },
          },
        })
        res.status(200).json(duel)
        break
      case 'PUT':
        duel = await prisma.duel.update({
          where: { id: Number(duelId) },
          data: {
            firstPlayerId: currentDuel.firstPlayerId,
            secondPlayerId: currentDuel.secondPlayerId,
            winnerId: currentDuel.winnerId,
          },
        })
        res.status(200).json(duel)
        break
      default:
        res.setHeader('Allow', ['GET', 'PUT'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.error(error)
    log.error(error)
    res.status(400).json({ message: error })
  }
}
