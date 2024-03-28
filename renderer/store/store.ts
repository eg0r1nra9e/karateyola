import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import categoriesSlice from './slices/categoriesSlice'
import athletesSliceReducer from './slices/athletesSlice'
import competitionsSliceReducer from './slices/competitionsSlice'
import currentDuelSlice from './slices/currentDuelSlice'
import gamesSliceReducer from './slices/gamesSlice'
import teamsSliceReducer from './slices/teamsSlice'
import { createStateSyncMiddleware, initMessageListener } from 'redux-state-sync'

export function createStore(reduxState?: any) {
  return configureStore({
    reducer: {
      teams: teamsSliceReducer,
      competitions: competitionsSliceReducer,
      athletes: athletesSliceReducer,
      games: gamesSliceReducer,
      currentDuel: currentDuelSlice,
      categories: categoriesSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(createStateSyncMiddleware({ channel: 'karateYola' })),
    preloadedState: reduxState,
  })
}

const store = createStore()

export type TAppState = ReturnType<typeof store.getState>

export type TAppDispatch = typeof store.dispatch

export type TAppThunk<ReturnType = void> = ThunkAction<ReturnType, TAppState, unknown, Action<string>>

export default store
