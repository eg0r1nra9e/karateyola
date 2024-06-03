import log from 'electron-log'
import { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'
import { GameWithAll } from '../../../types/GameWithAll'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const gameId = +req.query.id
  const { name, startDate, endDate, status, competitions } = req.body as GameWithAll

  const connectCompetitions =
    competitions?.map((competition) => {
      return {
        id: competition.id,
        categories: {
          set: [],
        },
      }
    }) ?? []

  console.log(connectCompetitions)

  let competition

  try {
    switch (req.method) {
      case 'GET':
        competition = await prisma.game.findUnique({
          where: {
            id: gameId,
          },
          include: {
            competitions: {
              include: {
                categories: {
                  include: {
                    standings: {
                      include: {
                        duels: {
                          include: {
                            onePlayer: true,
                            twoPlayer: true,
                            winner: true,
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        })
        res.status(200).json(competition)
        break
      case 'PUT':
        competition = await prisma.game.update({
          where: { id: Number(gameId) },

          data: {
            name,
            startDate,
            endDate,
            status,
            competitions: {
              set: [],
              connect: connectCompetitions,
            },
          },
        })
        res.status(200).json(competition)
        break
      case 'DELETE':
        competition = await prisma.game.delete({
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
