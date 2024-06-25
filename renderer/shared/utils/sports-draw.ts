import { chunk, shuffle, uniq } from 'lodash'

import { Duel } from '@prisma/client'

export function playoff(athletes: number[]): Duel[] {
  const randomDuels = [...chunk(shuffle(uniq(athletes)), 2)]
  let duels: Duel[] = randomDuels.map(
    (duel) =>
      ({
        firstPlayerId: duel[0],
        secondPlayerId: duel[1] ?? null,
      }) as Duel,
  )

  return duels
}
