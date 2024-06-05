import log from 'electron-log'
import { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'
import { GameWithAll } from '../../../types/GameWithAll'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const gameId = +req.query.id
  const { name, startDate, endDate, status, competitions } = req.body as GameWithAll

  const createCompetitions =
    competitions?.map((competition) => {
      const createCategories =
        competition.categories.map((category) => {
          return {
            categoryId: category.id,
          }
        }) ?? []
      return {
        competitionId: competition.id,
        categories: {
          create: createCategories,
        },
      }
    }) ?? []

  let game

  try {
    switch (req.method) {
      case 'GET':
        game = await prisma.game.findUnique({
          where: {
            id: gameId,
          },
          include: {
            competitions: {
              include: {
                competition: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
                categories: {
                  include: {
                    category: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                    athletes: {
                      include: {
                        athlete: {
                          select: {
                            id: true,
                            lastName: true,
                            firstName: true,
                          },
                        },
                      },
                    },
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
            competitions: {
              deleteMany: {},
              create: createCompetitions,
            },
          },
        })
        res.status(200).json(game)
        break
      case 'DELETE':
        const competitions = await prisma.gameCompetition.findMany({
          where: { gameId: Number(gameId) },
          select: {
            id: true,
          },
        })

        await prisma.$transaction([
          // prisma.gameCategory.deleteMany({
          //   where: { competitionId: competitions },
          // }),
          // prisma.gameCompetition.deleteMany({
          //   where: { gameId: Number(gameId) },
          // }),
          prisma.game.deleteMany({
            where: { id: Number(gameId) },
          }),
        ])

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
