import { Prisma } from '@prisma/client'

export const standingWithDuel = Prisma.validator<Prisma.StandingDefaultArgs>()({
  include: {
    duels: {
      include: {
        firstPlayer: {
          include: {
            team: {
              include: {
                city: true,
              },
            },
          },
        },
        secondPlayer: {
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
