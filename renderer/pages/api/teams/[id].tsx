import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const teamId = +req.query.id
  const { name, cityId } = req.body

  let team

  switch (req.method) {
    case 'GET':
      team = await prisma.team.findUnique({
        where: {
          id: teamId,
        },
      })
      res.status(200).json(team)
      break
    case 'POST':
      team = await prisma.team.create({
        data: {
          name,
          cityId,
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
      res.status(200).json({ message: 'Note updated' })
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
}
