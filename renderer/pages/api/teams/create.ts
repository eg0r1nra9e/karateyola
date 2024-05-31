import { PrismaClient, Team } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { name, cityId } = req.body as Team

  const team = await prisma.team.create({
    data: {
      name,
      cityId,
    },
  })
  res.status(200).json(team)
}
