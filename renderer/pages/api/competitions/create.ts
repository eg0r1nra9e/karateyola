import log from 'electron-log'

import { Competition, PrismaClient } from '@prisma/client'

import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { name } = req.body as Competition

  try {
    const competition = await prisma.competition.create({
      data: {
        name,
      },
    })
    res.status(200).json(competition)
  } catch (error) {
    console.error(error)
    log.error(error)
    res.status(400).json({ message: error })
  }
}
