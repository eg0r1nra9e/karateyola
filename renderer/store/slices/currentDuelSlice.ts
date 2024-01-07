import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICurrentDuel } from '../../types/ICurrentDuel'
import { IDuel } from '../../types/IDuel'
import { TAppState } from '../store'
import { v4 as uuidv4 } from 'uuid'

interface ICurrentDuelState {
  duel: ICurrentDuel
}

const initialState: ICurrentDuelState = {
  duel: {
    id: null,
    competitionName: null,
    categoryName: null,
    playerOne: null,
    playerTwo: null,
    result: null,
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
      state.duel.playerOne.fail = state.duel.playerOne.fail + action.payload
    },
    addFailTwo: (state, action: PayloadAction<number>) => {
      state.duel.playerTwo.fail = state.duel.playerTwo.fail + action.payload
    },
    addScoreOne: (state, action: PayloadAction<number>) => {
      state.duel.playerOne.score = state.duel.playerOne.score + action.payload
    },
    addScoreTwo: (state, action: PayloadAction<number>) => {
      state.duel.playerTwo.score = state.duel.playerTwo.score + action.payload
    },
    addBenefitOne: (state, action: PayloadAction<number>) => {
      state.duel.playerOne.benefit = state.duel.playerOne.benefit + action.payload
    },
    addBenefitTwo: (state, action: PayloadAction<number>) => {
      state.duel.playerTwo.benefit = state.duel.playerTwo.benefit + action.payload
    },
    setTime: (state, action: PayloadAction<number>) => {
      if (!state?.duel) {
        return
      }
      state.duel.timer = action.payload
    },
    endDuel: (state, action: PayloadAction<string>) => {
      state.duel.result = action.payload
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
