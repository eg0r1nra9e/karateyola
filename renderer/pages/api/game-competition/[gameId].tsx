import log from 'electron-log'
import { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'
import { GameCompetitionWithCategory } from '../../../types/GameCompetitionWithAthlete'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const gameId = Number(req.query.gameId)
  const competitions = req.body as GameCompetitionWithCategory[]

  console.log(competitions)
  let gameCompetitions
  try {
    switch (req.method) {
      case 'GET':
        gameCompetitions = await prisma.gameCompetition.findMany({
          where: { gameId: Number(gameId) },
          include: {
            categories: {
              include: {
                category: true,
              },
            },
          },
        })
        res.status(200).json(gameCompetitions)
        break
      case 'PUT':
        const newCompetitions = competitions.map((competition) => ({
          gameId,
          competitionId: competition.id,
          categories: competition.categories.map((category) => ({
            categoryId: category.id,
          })),
        }))

        console.log(newCompetitions)

        const updateCompetitions = competitions.map((competition) => {
          return prisma.gameCompetition.create({
            data: {
              gameId,
              competitionId: competition.id,
              categories: {
                create: competition.categories.map((category) => ({
                  categoryId: category.id,
                })),
              },
            },
          })
        })

        const [t1, t2] = await prisma.$transaction([
          prisma.gameCompetition.deleteMany({
            where: { gameId: Number(gameId) },
          }),
          ...updateCompetitions,
        ])

        console.log(t1, t2)

        res.status(200).json(gameCompetitions)
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
