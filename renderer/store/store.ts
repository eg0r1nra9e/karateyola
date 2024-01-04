import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import teamsSliceReducer from './slices/teamsSlice'

export function createStore(reduxState?: any) {
  return configureStore({
    reducer: {
      teams: teamsSliceReducer,
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
