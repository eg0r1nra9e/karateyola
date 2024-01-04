/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

import type { TAppState } from '../store'
import { ITeam } from '../../types/ITeam'

interface ITeamsState {
  teams: ITeam[]
}

const initialState: ITeamsState = {
  teams: [],
}

export const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    addTeam: (state, action: PayloadAction<ITeam>) => {
      const team = { ...action.payload, id: uuidv4() }
      state.teams = [...state.teams, team]
    },
    editTeam: (state, action: PayloadAction<ITeam>) => {
      const team = state.teams.find((team) => team.id === action.payload.id)
      team.city = action.payload.city
      team.name = action.payload.name
    },
    removeTeam: (state, action: PayloadAction<string>) => {
      state.teams = state.teams.filter((team) => team.id !== action.payload)
    },
  },
})

export const { addTeam, removeTeam, editTeam } = teamsSlice.actions

export const selectTeams = (state: TAppState) => state.teams.teams
export const selectTeam = (state: TAppState, teamId: string) => state.teams.teams.find((team) => team.id === teamId)

export default teamsSlice.reducer
