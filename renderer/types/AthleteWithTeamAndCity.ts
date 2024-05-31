import { Prisma } from '@prisma/client'

export const athleteWithTeamAndCity = Prisma.validator<Prisma.AthleteDefaultArgs>()({
  include: {
    team: {
      include: {
        city: {
          select: {
            city: true,
          },
        },
      },
    },
  },
})

export type AthleteWithTeamAndCity = Prisma.AthleteGetPayload<typeof athleteWithTeamAndCity>
