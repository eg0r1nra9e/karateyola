import { Prisma } from '@prisma/client'

export const gameCompetitionWithCategoryAndAthletes = Prisma.validator<Prisma.GameCompetitionDefaultArgs>()({
  include: {
    competition: true,
    categories: {
      include: {
        category: true,
        athletes: true,
        standings: {
          include: {
            duels: {
              include: {
                firstPlayer: {
                  include: {
                    team: true,
                  },
                },
                secondPlayer: {
                  include: {
                    team: true,
                  },
                },
              },
            },
          },
        },
      },
    },
  },
})

export type GameCompetitionWithCategoryAndAthletes = Prisma.GameCompetitionGetPayload<
  typeof gameCompetitionWithCategoryAndAthletes
>
