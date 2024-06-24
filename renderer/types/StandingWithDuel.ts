import { Prisma } from '@prisma/client'

export const standingWithDuel = Prisma.validator<Prisma.StandingDefaultArgs>()({
  include: {
    duels: {
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
      },
    },
  },
})

export type StandingWithDuel = Prisma.StandingGetPayload<typeof standingWithDuel>
