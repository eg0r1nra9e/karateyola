import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { player } from '../components/Player'
import type { TAppState } from '../store'
import { IPlayer } from '../../types/IPlayer'

interface IPlayersState {
  players: IPlayer[]
}

const initialState: IPlayersState = {
  players: [],
}

export const playersSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    addPlayer: (state, action: PayloadAction<IPlayer>) => {
      state.players = [...state.players, player]
    },
    editPlayer: (state, action: PayloadAction<IPlayer>) => {
      const player = state.players.find((player) => player.id === action.payload.id)
      player.score = action.payload.score
      player.fail = action.payload.fail
    },
    removePlayer: (state, action: PayloadAction<string>) => {
      state.players = state.players.filter((player) => player.id !== action.payload)
    },
  },
})

export const { addPlayer, removePlayer, editPlayer } = playersSlice.actions

export const selectPlayers = (state: TAppState) => state.players.players
export const selectPlayer = (state: TAppState, playerId: string) =>
  state.players.players.find((player) => player.id === playerId)

export default playersSlice.reducer
