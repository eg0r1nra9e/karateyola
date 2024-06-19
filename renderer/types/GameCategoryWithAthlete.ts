import { Prisma } from '@prisma/client'

export const gameCategoryWithAthlete = Prisma.validator<Prisma.GameCategoryDefaultArgs>()({
  include: {
    athletes: true,
  },
})

export type GameCategoryWithAthlete = Prisma.GameCategoryGetPayload<typeof gameCategoryWithAthlete>
