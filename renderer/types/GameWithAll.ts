import { Prisma } from '@prisma/client'

export const gameWithAll = Prisma.validator<Prisma.GameDefaultArgs>()({
  include: {
    competitions: {
      include: {
        competition: {
          select: {
            id: true,
            name: true,
          },
        },
        categories: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
              },
            },
            athletes: {
              include: {
                athlete: {
                  select: {
                    id: true,
                    lastName: true,
                    firstName: true,
                  },
                },
              },
            },
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
