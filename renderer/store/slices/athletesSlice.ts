import { v4 as uuidv4 } from 'uuid'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IAthlete } from '../../types/IAthlete'

import type { TAppState } from '../store'
interface IAthletesState {
  athletes: IAthlete[]
}

const initialState: IAthletesState = {
  athletes: [],
}

export const athletesSlice = createSlice({
  name: 'athletes',
  initialState,
  reducers: {
    addAthlete: (state, action: PayloadAction<IAthlete>) => {
      const athlete = { ...action.payload, id: uuidv4() }
      state.athletes = [...state.athletes, athlete]
    },
    editAthlete: (state, action: PayloadAction<IAthlete>) => {
      const athlete = state.athletes.find((athlete) => athlete.id === action.payload.id)
      athlete.firstName = action.payload.firstName
      athlete.lastName = action.payload.lastName
      athlete.dateOfBirth = action.payload.dateOfBirth
      athlete.gender = action.payload.gender
      athlete.weight = action.payload.weight
      athlete.teamId = action.payload.teamId
    },
    removeAthlete: (state, action: PayloadAction<string>) => {
      state.athletes = state.athletes.filter((athlete) => athlete.id !== action.payload)
    },
  },
})

export const { addAthlete, removeAthlete, editAthlete } = athletesSlice.actions

export const selectAthletes = (state: TAppState) => state.athletes.athletes
export const selectAthlete = (state: TAppState, athleteId: string) =>
  state.athletes.athletes.find((athlete) => athlete.id === athleteId)

export default athletesSlice.reducer
