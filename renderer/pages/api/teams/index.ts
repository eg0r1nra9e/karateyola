import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    const teams = await prisma.team.findMany()
    res.status(200).json(teams)
  } catch (error) {
    res.status(200).json(error)
  }
}
