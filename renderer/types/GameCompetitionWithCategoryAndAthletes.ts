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
                onePlayer: {
                  include: {
                    team: true,
                  },
                },
                twoPlayer: {
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
