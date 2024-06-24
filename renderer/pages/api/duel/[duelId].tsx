import log from 'electron-log'
import { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'
import { GameCompetitionWithCategoryAndAthletes } from '../../../types/GameCompetitionWithCategoryAndAthletes'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const duelId = Number(req.query.duelId)
  const competitions = req.body as GameCompetitionWithCategoryAndAthletes[]

  console.log(competitions)
  let duel
  try {
    switch (req.method) {
      case 'GET':
        duel = await prisma.duel.findUnique({
          where: { id: duelId },
          include: {
            onePlayer: {
              include: {
                team: {
                  include: {
                    city: true,
                  },
                },
              },
            },
            twoPlayer: {
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
      case 'POST':
        // const createCompetitions = competitions.map((competition) => {
        //   return prisma.gameCompetition.create({
        //     data: {
        //       gameId,
        //       competitionId: competition.id,
        //       categories: {
        //         create: competition.categories.map((category) => ({
        //           categoryId: category.id,
        //         })),
        //       },
        //     },
        //   })
        // })

        // const [t1, t2] = await prisma.$transaction([
        //   prisma.gameCompetition.deleteMany({
        //     where: { gameId: Number(gameId) },
        //   }),
        //   ...createCompetitions,
        // ])

        // console.log(t1, t2)

        // res.status(200).json(gameCompetitions)
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
