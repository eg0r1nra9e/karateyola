import { Prisma } from '@prisma/client'

export const teamWithCity = Prisma.validator<Prisma.TeamDefaultArgs>()({
  include: { city: true },
})

export type TeamWithCity = Prisma.TeamGetPayload<typeof teamWithCity>
