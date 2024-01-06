import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import athletesSliceReducer from './slices/athletesSlice'
import competitionsSliceReducer from './slices/competitionsSlice'
import currentDuelSlice from './slices/currentDuelSlice'
import gamesSliceReducer from './slices/gamesSlice'
import teamsSliceReducer from './slices/teamsSlice'

export function createStore(reduxState?: any) {
  return configureStore({
    reducer: {
      teams: teamsSliceReducer,
      competitions: competitionsSliceReducer,
      athletes: athletesSliceReducer,
      games: gamesSliceReducer,
      currentDuel: currentDuelSlice,
    },
    preloadedState: {
      ...reduxState,
    },
  })
}

const store = createStore()

export type TAppState = ReturnType<typeof store.getState>

export type TAppDispatch = typeof store.dispatch

export type TAppThunk<ReturnType = void> = ThunkAction<ReturnType, TAppState, unknown, Action<string>>

export default store
