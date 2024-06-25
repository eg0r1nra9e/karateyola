import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ICurrentDuel } from '../../types/ICurrentDuel'
import { TAppState } from '../store'

interface ICurrentDuelState {
  duel: ICurrentDuel
}

const initialState: ICurrentDuelState = {
  duel: {
    id: null,
    competitionName: null,
    categoryName: null,
    firstPlayer: null,
    secondPlayer: null,
    winnerId: null,
    timer: 0,
  },
}

export const currentDuelSlice = createSlice({
  name: 'currentDuel',
  initialState,
  reducers: {
    addDuel: (state, action: PayloadAction<ICurrentDuel>) => {
      state.duel = { ...state.duel, ...action.payload }
    },
    addFailOne: (state, action: PayloadAction<number>) => {
      state.duel.firstPlayer.fail = state.duel.firstPlayer.fail + action.payload
    },
    addFailTwo: (state, action: PayloadAction<number>) => {
      state.duel.secondPlayer.fail = state.duel.secondPlayer.fail + action.payload
    },
    addScoreOne: (state, action: PayloadAction<number>) => {
      state.duel.firstPlayer.score = state.duel.firstPlayer.score + action.payload
    },
    addScoreTwo: (state, action: PayloadAction<number>) => {
      state.duel.secondPlayer.score = state.duel.secondPlayer.score + action.payload
    },
    addBenefitOne: (state, action: PayloadAction<number>) => {
      state.duel.firstPlayer.benefit = state.duel.firstPlayer.benefit + action.payload
    },
    addBenefitTwo: (state, action: PayloadAction<number>) => {
      state.duel.secondPlayer.benefit = state.duel.secondPlayer.benefit + action.payload
    },
    setTime: (state, action: PayloadAction<number>) => {
      if (!state?.duel) {
        return
      }
      state.duel.timer = action.payload
    },
    endDuel: (state, action: PayloadAction<number>) => {
      state.duel.winnerId = action.payload
    },
  },
})

export const {
  addDuel,
  addFailOne,
  addFailTwo,
  addScoreOne,
  addScoreTwo,
  addBenefitOne,
  addBenefitTwo,
  setTime,
  endDuel,
} = currentDuelSlice.actions

export const selectCurrentDuel = (state: TAppState) => state.currentDuel.duel

export default currentDuelSlice.reducer
