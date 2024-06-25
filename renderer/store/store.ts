import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'

import { createStateSyncMiddleware } from 'redux-state-sync'
import currentDuelSlice from './slices/currentDuelSlice'

export function createStore(reduxState?: any) {
  return configureStore({
    reducer: {
      currentDuel: currentDuelSlice,
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
