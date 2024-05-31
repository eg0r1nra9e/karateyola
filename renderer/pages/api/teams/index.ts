import log from 'electron-log'
import { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const teams = await prisma.team.findMany({
      include: {
        city: {
          select: {
            city: true,
          },
        },
      },
    })
    res.status(200).json(teams)
  } catch (error) {
    console.error(error)
    log.error(error)
    res.status(400).json({ message: error })
  }
}
