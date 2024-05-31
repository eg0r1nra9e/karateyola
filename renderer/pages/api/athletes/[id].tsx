import log from 'electron-log/main'
import { NextApiRequest, NextApiResponse } from 'next'

import { Athlete, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const athleteId = +req.query.id
  const { firstName, lastName, dateOfBirth, teamId, gender, weight } = req.body as Athlete

  let athlete

  try {
    switch (req.method) {
      case 'GET':
        athlete = await prisma.athlete.findUnique({
          where: {
            id: athleteId,
          },
        })
        res.status(200).json(athlete)
        break
      case 'PUT':
        athlete = await prisma.athlete.update({
          where: { id: Number(athleteId) },
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
        break
      case 'DELETE':
        athlete = await prisma.athlete.delete({
          where: { id: Number(athleteId) },
        })
        res.status(200).json({ message: 'Note updated' })
        break
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.error(error)
    log.error(error)
    res.status(400).json({ message: error })
  }
}
