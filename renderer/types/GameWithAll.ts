import { Prisma } from '@prisma/client'

export const gameWithAll = Prisma.validator<Prisma.GameDefaultArgs>()({
  include: {
    competitions: {
      include: {
        categories: {
          include: {
            standings: {
              include: {
                duels: {
                  include: {
                    onePlayer: true,
                    twoPlayer: true,
                    winner: true,
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

export type GameWithAll = Prisma.GameGetPayload<typeof gameWithAll>
