import { Prisma } from '@prisma/client'

export const duelWithAll = Prisma.validator<Prisma.DuelDefaultArgs>()({
  include: {
    onePlayer: {
      include: {
        team: {
          include: {
            city: true,
          },
        },
      },
    },
    twoPlayer: {
      include: {
        team: {
          include: {
            city: true,
          },
        },
      },
    },
    standing: {
      include: {
        gameCategory: {
          include: {
            category: true,
            gameCompetition: {
              include: {
                competition: true,
                game: true,
              },
            },
          },
        },
      },
    },
  },
})

export type DuelWithAll = Prisma.DuelGetPayload<typeof duelWithAll>
