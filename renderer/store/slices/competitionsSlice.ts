import { v4 as uuidv4 } from 'uuid'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ICompetition } from '../../types/ICompetition'

import type { TAppState } from '../store'
interface ICompetitionsState {
  competitions: ICompetition[]
}

const initialState: ICompetitionsState = {
  competitions: [],
}

export const competitionsSlice = createSlice({
  name: 'competitions',
  initialState,
  reducers: {
    addCompetition: (state, action: PayloadAction<ICompetition>) => {
      const competition = { ...action.payload, id: uuidv4() }
      state.competitions = [...state.competitions, competition]
    },
    editCompetition: (state, action: PayloadAction<ICompetition>) => {
      const competition = state.competitions.find((competition) => competition.id === action.payload.id)
      competition.name = action.payload.name
    },
    removeCompetition: (state, action: PayloadAction<string>) => {
      state.competitions = state.competitions.filter((competition) => competition.id !== action.payload)
    },
  },
})

export const { addCompetition, removeCompetition, editCompetition } = competitionsSlice.actions

export const selectCompetitions = (state: TAppState) => state.competitions.competitions
export const selectCompetition = (state: TAppState, competitionId: string) =>
  state.competitions.competitions.find((competition) => competition.id === competitionId)

export default competitionsSlice.reducer
