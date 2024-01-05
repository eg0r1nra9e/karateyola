import { v4 as uuidv4 } from 'uuid'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IGame } from '../../types/IGame'

import type { TAppState } from '../store'
interface IGamesState {
  games: IGame[]
}

const initialState: IGamesState = {
  games: [],
}

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    addGame: (state, action: PayloadAction<IGame>) => {
      const game = { ...action.payload, id: uuidv4() }
      state.games = [...state.games, game]
    },
    editGame: (state, action: PayloadAction<IGame>) => {
      const game = state.games.find((game) => game.id === action.payload.id)
      game.name = action.payload.name
      game.firstDate = action.payload.firstDate
      game.lastDate = action.payload.lastDate
      game.status = action.payload.status
      game.competitions = action.payload.competitions
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
