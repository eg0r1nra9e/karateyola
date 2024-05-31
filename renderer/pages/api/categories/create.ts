import log from 'electron-log'

import { Category, PrismaClient } from '@prisma/client'

import type { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { name, time } = req.body as Category

  try {
    const category = await prisma.category.create({
      data: {
        name,
        time: Number(time),
      },
    })
    res.status(200).json(category)
  } catch (error) {
    console.error(error)
    log.error(error)
    res.status(400).json({ message: error })
  }
}
