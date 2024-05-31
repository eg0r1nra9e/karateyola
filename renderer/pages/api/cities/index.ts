import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const teams = await prisma.city.findMany()
  res.status(200).json(teams)
}
