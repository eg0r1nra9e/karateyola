import log from 'electron-log'
import { NextApiRequest, NextApiResponse } from 'next'

import { GameAthlete, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const gameAthlete = req.body as GameAthlete[]
  console.log(gameAthlete)

  try {
    const deleteGameCompetitions = gameAthlete.map((gameAthlete) => {
      return prisma.gameAthlete.deleteMany({
        where: { gameCategoryId: Number(gameAthlete.gameCategoryId) },
      })
    })

    const [t1, t2] = await prisma.$transaction([
      ...deleteGameCompetitions,
      prisma.gameAthlete.createMany({
        data: gameAthlete,
      }),
    ])

    res.status(200).json(gameAthlete)
  } catch (error) {
    console.error(error)
    log.error(error)
    res.status(400).json({ message: error })
  }
}
