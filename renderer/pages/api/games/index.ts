import log from 'electron-log'
import { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const games = await prisma.game.findMany({
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

    res.status(200).json(games)
  } catch (error) {
    console.error(error)
    log.error(error)
    res.status(400).json({ message: error })
  }
}
