import { Prisma } from '@prisma/client'

export const gameCompetitionWithCategory = Prisma.validator<Prisma.GameCompetitionDefaultArgs>()({
  include: {
    categories: {
      include: {
        category: true,
      },
    },
  },
})

export type GameCompetitionWithCategory = Prisma.GameCompetitionGetPayload<typeof gameCompetitionWithCategory>
