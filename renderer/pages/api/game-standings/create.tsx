import log from 'electron-log'
import { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'
import { StandingWithDuel } from '../../../types/StandingWithDuel'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const standings = req.body as StandingWithDuel[]
  console.log(standings)

  try {
    const deleteStandings = standings.map((standing) => {
      return prisma.standing.deleteMany({
        where: { gameCategoryId: Number(standing.gameCategoryId) },
      })
    })

    const createCompetitions = standings.map((standing) => {
      return prisma.standing.create({
        data: {
          gameCategoryId: standing.gameCategoryId,
          duels: {
            create: standing.duels.map((duel) => ({
              onePlayerId: duel.onePlayerId,
              twoPlayerId: duel.twoPlayerId,
            })),
          },
        },
      })
    })

    const [t1, t2] = await prisma.$transaction([...deleteStandings, ...createCompetitions])

    res.status(200).json(standings)
  } catch (error) {
    console.error(error)
    log.error(error)
    res.status(400).json({ message: error })
  }
}
