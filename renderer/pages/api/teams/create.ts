import log from 'electron-log'

import { PrismaClient, Team } from '@prisma/client'

import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { name, cityId } = req.body as Team

  try {
    const team = await prisma.team.create({
      data: {
        name,
        cityId,
      },
    })
    res.status(200).json(team)
  } catch (error) {
    console.error(error)
    log.error(error)
    res.status(400).json({ message: error })
  }
}
