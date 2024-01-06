import { v4 as uuidv4 } from 'uuid'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IGame } from '../../types/IGame'

import type { TAppState } from '../store'
import { uniq, shuffle, chunk } from 'lodash'
import { IGameCompetition } from '../../types/IGameCompetition'

interface IGamesState {
  games: IGame[]
}

const initialState: IGamesState = {
  games: [],
}

const getCompetitions = (competitions: IGameCompetition[]): IGameCompetition[] => {
  const currentCompetitions = [...competitions]

  currentCompetitions?.forEach((competition) => {
    competition?.categories?.forEach((category) => {
      if (!category) {
        return
      }

      const duels = chunk(shuffle(uniq(category?.athletes)), 2)

      category.standings = duels.map((duel) => ({
        id: uuidv4(),
        athletesId: duel,
      }))
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
  },
})

export const { addGame, removeGame, editGame, startGame, endGame } = gamesSlice.actions

export const selectGames = (state: TAppState) => state.games.games
export const selectGame = (state: TAppState, gameId: string) => state.games.games.find((game) => game.id === gameId)

export default gamesSlice.reducer
