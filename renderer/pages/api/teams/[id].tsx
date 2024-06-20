import log from 'electron-log'
import { NextApiRequest, NextApiResponse } from 'next'

import { PrismaClient, Team } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const teamId = +req.query.id
  const { name, cityId } = req.body as Team

  let team

  try {
    switch (req.method) {
      case 'GET':
        team = await prisma.team.findUnique({
          where: {
            id: teamId,
          },
        })
        res.status(200).json(team)
        break

      case 'PUT':
        team = await prisma.team.update({
          where: { id: Number(teamId) },
          data: {
            name,
            cityId,
          },
        })
        res.status(200).json(team)
        break

      case 'DELETE':
        team = await prisma.team.delete({
          where: { id: Number(teamId) },
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
