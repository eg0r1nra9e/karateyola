import log from 'electron-log/main'

import { Athlete, PrismaClient } from '@prisma/client'

import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { firstName, lastName, dateOfBirth, teamId, gender, weight } = req.body as Athlete

  try {
    const athlete = await prisma.athlete.create({
      data: {
        firstName,
        lastName,
        dateOfBirth,
        teamId,
        gender,
        weight: Number(weight),
      },
    })
    res.status(200).json(athlete)
  } catch (error) {
    console.error(error)
    log.error(error)
    res.status(400).json({ message: error })
  }
}
