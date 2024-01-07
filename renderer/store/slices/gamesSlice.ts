import { chunk, filter, shuffle, toLower, uniq } from 'lodash'
import { v4 as uuidv4 } from 'uuid'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ICompetition } from '../../types/ICompetition'
import { IGame } from '../../types/IGame'
import { IStanding } from '../../types/IStanding'
import { IWinner } from '../../types/IWinner'

import type { TAppState } from '../store'
interface IGamesState {
  games: IGame[]
}

const initialState: IGamesState = {
  games: [],
}

const getCompetitions = (competitions: ICompetition[]): ICompetition[] => {
  const currentCompetitions = [...competitions]

  currentCompetitions?.forEach((competition) => {
    competition?.categories?.forEach((category) => {
      if (!category) {
        return
      }

      const duels = chunk(shuffle(uniq(category?.athletes)), 2)

      if (!category.id) {
        category.id = uuidv4()
      }
      category.standings = [
        {
          id: uuidv4(),
          duels: duels.map((duel) => ({
            id: uuidv4(),
            athletesId: duel,
            winner: duel?.length === 1 ? duel[0] : null,
          })),
        },
      ]
    })
  })

  return currentCompetitions
}

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    addGame: (state, action: PayloadAction<IGame>) => {
      const game = { ...action.payload, id: uuidv4(), competitions: getCompetitions(action.payload.competitions) }
      state.games = [...state.games, game]
    },
    editGame: (state, action: PayloadAction<IGame>) => {
      const game = state.games.find((game) => game.id === action.payload.id)
      game.name = action.payload.name
      game.dates = action.payload.dates
      game.status = action.payload.status
      game.competitions = getCompetitions(action.payload.competitions)
    },
    startGame: (state, action: PayloadAction<string>) => {
      const game = state.games.find((game) => game.id === action.payload)
      game.status = 'идет'
    },
    endGame: (state, action: PayloadAction<string>) => {
      const game = state.games.find((game) => game.id === action.payload)
      game.status = 'закончено'
    },
    removeGame: (state, action: PayloadAction<string>) => {
      state.games = state.games.filter((game) => game.id !== action.payload)
    },
    setWinner: (state, action: PayloadAction<IWinner>) => {
      const game = state.games.find((game) => game.id === action.payload.gameId)
      const competition = game?.competitions?.find((c) => c.id === action.payload.competitionId)
      const category = competition?.categories.find((c) => c.name === action.payload.categoryName)
      const standing = category?.standings.find((c) => c.id === action.payload.standingId)
      const duel = standing?.duels.find((c) => c.id === action.payload.duelId)
      duel.winner = action.payload.athleteId
      const winners = standing?.duels.filter((duel) => duel.winner).map((duel) => duel.winner)

      if (winners?.length === standing?.duels?.length) {
        // Тeкущий круг пройден
        const duels = chunk(uniq(winners), 2)
        const newStanding: IStanding = {
          id: uuidv4(),
          duels: duels.map((duel) => ({
            id: uuidv4(),
            athletesId: duel,
            winner: duel?.length === 1 ? duel[0] : null,
          })),
        }
        category.standings.push(newStanding)
      }
    },
  },
})

export const { addGame, removeGame, editGame, startGame, endGame, setWinner } = gamesSlice.actions

export const selectGames = (state: TAppState) => state.games.games
export const selectGame = (state: TAppState, gameId: string) => state.games.games.find((game) => game.id === gameId)

export default gamesSlice.reducer

let foundValue, // Populated with the searched object
  found = false // Internal flag for iterate()

// Recursive function searching through array
function iterate(haystack) {
  if (typeof haystack !== 'object' || haystack === null) return // type-safety
  if (typeof haystack.id !== 'undefined') {
    found = true
    foundValue = haystack.id
    return
  } else {
    for (var i in haystack) {
      // avoid circular reference infinite loop & skip inherited properties
      if (haystack === haystack[i] || !haystack.hasOwnProperty(i)) continue

      iterate(haystack[i])
      if (found === true) return
    }
  }
}
