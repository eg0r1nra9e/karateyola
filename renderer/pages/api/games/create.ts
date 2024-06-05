import log from 'electron-log'

import { PrismaClient } from '@prisma/client'

import type { NextApiRequest, NextApiResponse } from 'next'
import { GameWithAll } from '../../../types/GameWithAll'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
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

  try {
    const game = await prisma.game.create({
      data: {
        name,
        startDate,
        endDate,
        status,
        competitions: {
          create: createCompetitions,
        },
      },
    })
    res.status(200).json(game)
  } catch (error) {
    console.error(error)
    log.error(error)
    res.status(400).json({ message: error })
  }
}
